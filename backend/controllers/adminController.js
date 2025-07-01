import User from '../models/User.js';
import Order from '../models/Order.js';

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({message: 'Users fetched successfully', data: users});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Create a new user
export const addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            role
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', data: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Helper function to get start of the month for analytics
const getMonthStart = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
}

// Monthly revenue
export const getMonthlyRevenue = async (req, res) => {
    try {
        const monthStart = getMonthStart();

        const orders = await Order.find({
            created_at: { $gte: monthStart }
        });

        const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
        const totalSales = orders.length;

        res.status(200).json({
            totalRevenue,
            totalSales
        })
    } catch (error) {
        console.error('Error fetching monthly revenue:', error);
        res.status(500).json({ message: 'Error fetching monthly revenue' });
    }
}

// Sales over time
export const getSalesOverTime = async (req, res) => {
  const range = req.query.range || 'daily';

  try {
    const now = new Date();
    let match = {};
    let dateFormat;
    let labelMap = [];

    if (range === 'daily') {
      match = {
        created_at: {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6),
        },
      };
      dateFormat = '%w'; // 0 (Sun) - 6 (Sat)
      labelMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    } else if (range === 'weekly') {
      match = {
        created_at: {
          $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 28),
        },
      };
      dateFormat = '%U'; // Week number (01-53)
    } else if (range === 'yearly') {
      match = {
        created_at: {
          $gte: new Date(now.getFullYear(), 0, 1),
        },
      };
      dateFormat = '%m'; // Month number: 01 - 12
      labelMap = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
    } else {
      return res.status(400).json({ error: 'Invalid range' });
    }

    const result = await Order.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$created_at" } },
          totalSales: { $sum: "$total_amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formatted = result.map(item => {
      let name;
      if (range === 'daily') {
        const index = parseInt(item._id, 10);
        name = labelMap[index];
      } else if (range === 'yearly') {
        const index = parseInt(item._id, 10) - 1;
        name = labelMap[index];
      } else {
        name = `W${item._id}`;
      }

      return { name, sales: item.totalSales };
    });

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Error in getSalesOverTime:", err);
    res.status(500).json({ error: "Server error fetching sales data" });
  }
};

// Quick stats for dashboard
export const getQuickStats = async (req, res) => {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Revenue this month
    const orders = await Order.find({ created_at: { $gte: monthStart } });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
    const totalSales = orders.length;

    // New users this month
    const newUsers = await User.countDocuments({ created_at: { $gte: monthStart } });

    res.status(200).json({
      revenue: totalRevenue,
      newUsers,
      totalSales,
    });
  } catch (err) {
    console.error("Error in getQuickStats:", err);
    res.status(500).json({ error: "Server error fetching stats" });
  }
};
