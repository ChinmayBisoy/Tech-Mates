const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const requirementRouter = require('./routes/requirement.routes');
const proposalRouter = require('./routes/proposal.routes');
const contractRouter = require('./routes/contract.routes');
const userRouter = require('./routes/user.routes');
const reviewRouter = require('./routes/review.routes');
const walletRouter = require('./routes/wallet.routes');
const listingRouter = require('./routes/listing.routes');
const adminRouter = require('./routes/admin.routes');
const verificationRouter = require('./routes/verification.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/requirements', requirementRouter);
app.use('/api/proposals', proposalRouter);
app.use('/api/contracts', contractRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/listings', listingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/verification', verificationRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;