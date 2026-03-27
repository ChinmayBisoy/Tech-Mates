import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  // Notifications list
  notifications: [
    {
      id: 'notif_1',
      type: 'auction',
      title: 'You\'ve been outbid!',
      message: 'Someone placed a higher bid on Vintage Camera auction.',
      icon: 'gavel',
      color: 'warning',
      createdAt: new Date(Date.now() - 300000),
      read: false,
      link: '/marketplace/auctions',
      actionLabel: 'View Auction',
    },
    {
      id: 'notif_2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $850.00 from bob_buyer has been received.',
      icon: 'check-circle',
      color: 'success',
      createdAt: new Date(Date.now() - 600000),
      read: false,
      link: '/wallet/transactions',
      actionLabel: 'View Transaction',
    },
    {
      id: 'notif_3',
      type: 'message',
      title: 'New Message',
      message: 'alice_seller sent you a message: "Hi, can you ship today?"',
      icon: 'message-square',
      color: 'info',
      createdAt: new Date(Date.now() - 900000),
      read: true,
      link: '/messages',
      actionLabel: 'View Message',
    },
    {
      id: 'notif_4',
      type: 'dispute',
      title: 'Dispute Opened',
      message: 'A buyer has opened a dispute for order TRX_001.',
      icon: 'alert-circle',
      color: 'danger',
      createdAt: new Date(Date.now() - 1800000),
      read: true,
      link: '/marketplace/disputes',
      actionLabel: 'View Dispute',
    },
  ],

  // Notification preferences
  preferences: {
    email: {
      auctions: true,
      messages: true,
      transactions: true,
      disputes: true,
      promotions: false,
      digest: 'weekly',
    },
    push: {
      auctions: true,
      messages: true,
      transactions: true,
      disputes: true,
      promotions: false,
    },
    inApp: {
      auctions: true,
      messages: true,
      transactions: true,
      disputes: true,
      promotions: true,
    },
    sms: {
      enabled: false,
      events: ['disputes', 'transactions'],
    },
  },

  // Notification channels status
  channels: {
    email: { enabled: true, verified: true, address: 'john@example.com' },
    push: { enabled: true, verified: true, tokens: ['token_123'] },
    inApp: { enabled: true, verified: true },
    sms: { enabled: false, verified: false, number: null },
  },

  // Alert settings
  alertSettings: {
    auctionEnding: { enabled: true, minutesBefore: [60, 15, 5] },
    priceDrops: { enabled: true, threshold: 10 },
    newMatches: { enabled: true, frequency: 'daily' },
    sellerMessages: { enabled: true, delay: 'immediate' },
    bidNotifications: { enabled: true, notifyOnEverything: false },
  },

  // Notification statistics
  stats: {
    totalNotifications: 4,
    unreadCount: 2,
    last24hCount: 2,
    last7dCount: 4,
  },

  // Notification queue (pending)
  queue: [],

  // Actions
  addNotification: (notification) => {
    set((state) => ({
      notifications: [
        {
          id: `notif_${Date.now()}`,
          createdAt: new Date(),
          read: false,
          ...notification,
        },
        ...state.notifications,
      ].slice(0, 100),
      stats: {
        ...state.stats,
        totalNotifications: state.stats.totalNotifications + 1,
        unreadCount: state.stats.unreadCount + 1,
        last24hCount: state.stats.last24hCount + 1,
      },
    }));
  },

  markAsRead: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
      stats: {
        ...state.stats,
        unreadCount: Math.max(0, state.stats.unreadCount - 1),
      },
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      stats: {
        ...state.stats,
        unreadCount: 0,
      },
    }));
  },

  deleteNotification: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== notificationId),
    }));
  },

  clearAllNotifications: () => {
    set({
      notifications: [],
      stats: {
        totalNotifications: 0,
        unreadCount: 0,
        last24hCount: 0,
        last7dCount: 0,
      },
    });
  },

  updatePreferences: (newPreferences) => {
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...newPreferences,
      },
    }));
  },

  updateAlertSettings: (settings) => {
    set((state) => ({
      alertSettings: {
        ...state.alertSettings,
        ...settings,
      },
    }));
  },

  enableChannel: (channel) => {
    set((state) => ({
      channels: {
        ...state.channels,
        [channel]: {
          ...state.channels[channel],
          enabled: true,
        },
      },
    }));
  },

  disableChannel: (channel) => {
    set((state) => ({
      channels: {
        ...state.channels,
        [channel]: {
          ...state.channels[channel],
          enabled: false,
        },
      },
    }));
  },

  getUnreadNotifications: () => {
    return (state) => state.notifications.filter(n => !n.read);
  },

  getNotificationsByType: (type) => {
    return (state) => state.notifications.filter(n => n.type === type);
  },

  getRecentNotifications: (hours = 24) => {
    const cutoffTime = Date.now() - hours * 60 * 60 * 1000;
    return (state) =>
      state.notifications.filter(n => n.createdAt.getTime() > cutoffTime);
  },

  queueNotification: (notification) => {
    set((state) => ({
      queue: [
        ...state.queue,
        {
          id: `queued_${Date.now()}`,
          scheduled: true,
          ...notification,
        },
      ],
    }));
  },

  processQueue: () => {
    set((state) => ({
      notifications: [
        ...state.queue.map(q => ({
          ...q,
          scheduled: false,
          createdAt: new Date(),
          read: false,
        })),
        ...state.notifications,
      ],
      queue: [],
    }));
  },

  getNotificationStats: () => {
    return (state) => state.stats;
  },
}));
