import Order from '../models/Order.js';

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const endOfToday = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
};

//summary of Total orders today and orders delivered
export const getTodaySummary = async (req, res) => {
  try {
    const todayOrders = await Order.find({
      created_at: { $gte: startOfToday(), $lte: endOfToday() },
    });

    const totalOrdersToday = todayOrders.length;
    const ordersDeliveredToday = todayOrders.filter(
      (o) => o.status === 'delivered'
    ).length;

    // Count each status for today
    const statusCountsToday = {
      pending: 0,
      preparing: 0,
      'out for delivery': 0,
      delivered: 0,
    };
    todayOrders.forEach((o) => {
      const status = o.status.toLowerCase().trim();;
      if (statusCountsToday[status] !== undefined) {
        statusCountsToday[status] += 1;
      }
    });

    res.status(200).json({
      totalOrdersToday,
      ordersDeliveredToday,
      statusCountsToday,
    });
  } catch (err) {
    console.error('staffController:getTodaySummary →', err);
    res.status(500).json({ message: 'Server error fetching today summary' });
  }
};

/* ─────────────────────────────────────────────────────────
   2.  Live status counts across *all* orders
       GET /api/staff/statusCounts
────────────────────────────────────────────────────────── */
export const getStatusCounts = async (req, res) => {
  try {
    const agg = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // init with zeros so every key is returned
    const counts = {
      pending: 0,
      preparing: 0,
      'out for delivery': 0,
      delivered: 0,
    };
    agg.forEach((i) => {
      counts[i._id] = i.count;
    });

    res.status(200).json(counts);
  } catch (err) {
    console.error('staffController:getStatusCounts →', err);
    res.status(500).json({ message: 'Server error fetching status counts' });
  }
};

/* ─────────────────────────────────────────────────────────
   3.  Order trend (last N days, default 7)
       GET /api/staff/orderTrend?days=7
────────────────────────────────────────────────────────── */
export const getOrderTrend = async (req, res) => {
  const days = parseInt(req.query.days ?? '7', 10);
  if (isNaN(days) || days < 1 || days > 31) {
    return res.status(400).json({ message: 'Invalid days parameter' });
  }

  try {
    /* ----- 1.  Build UTC start‑of‑day “days‑ago” ----- */
    const nowUTC = new Date();                      
    const startUTC = new Date(Date.UTC(
      nowUTC.getUTCFullYear(),
      nowUTC.getUTCMonth(),
      nowUTC.getUTCDate() - (days - 1)               
    ));                                              

    /* ----- 2. Aggregate orders BY UTC day ----- */
    const agg = await Order.aggregate([
      { $match: { created_at: { $gte: startUTC } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    /* ----- 3. Fill missing days with 0 ----- */
    const map = Object.fromEntries(agg.map((d) => [d._id, d.orders]));
    const series = [];

    for (let i = 0; i < days; i++) {
      const d = new Date(startUTC.getTime() + i * 86_400_000);   
      const keyUTC = d.toISOString().slice(0, 10);              
      series.push({
        day: d.toLocaleDateString('en-GB', {
          day: 'numeric',                     
          month: 'short',
          timeZone: 'Africa/Nairobi',                            
        }),
        orders: map[keyUTC] ?? 0,
      });
    }

    res.status(200).json(series);
  } catch (err) {
    console.error('staffController:getOrderTrend →', err);
    res.status(500).json({ message: 'Server error fetching trend' });
  }
};
