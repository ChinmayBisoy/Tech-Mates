const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const requirementRouter = require('./routes/requirement.routes');
const proposalRouter = require('./routes/proposal.routes');
const contractRouter = require('./routes/contract.routes');
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

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;