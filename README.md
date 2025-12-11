# CoreX - Next-Generation DeFi & Crypto Trading Platform

CoreX is a complete decentralized finance (DeFi) and cryptocurrency trading ecosystem built with React, TypeScript, and Node.js. Experience the power of DeFi with yield farming, staking, liquidity pools, and DEX trading, combined with professional spot trading tools, non-custodial wallet management, and real-time multi-chain market data.


## 🌟 DeFi + Trading Combined

CoreX bridges the gap between traditional crypto trading and decentralized finance, offering:
- **DeFi Protocols**: Yield farming, staking, lending, and liquidity mining
- **DEX Trading**: Decentralized exchange with AMM and liquidity pools
- **Spot Trading**: Professional trading interface with advanced order types
- **Multi-Chain**: Support for Ethereum, BSC, Polygon, Avalanche, and more
- **Non-Custodial**: Your keys, your crypto - full asset control

## 🚀 Features

### DeFi Ecosystem
- **Decentralized Exchange (DEX)**: Trade directly from your wallet with automated market makers (AMM)
- **Yield Farming**: Maximize returns with automated yield farming strategies and liquidity mining rewards
- **Staking & Lending**: Stake tokens to earn rewards or lend assets with transparent smart contracts
- **Liquidity Pools**: Provide liquidity and earn trading fees from the pool
- **Cross-Chain Bridges**: Seamlessly move assets between Ethereum, BSC, Polygon, Avalanche, and more
- **DAO Governance**: Participate in protocol governance with voting rights on proposals and upgrades

### Trading & Markets
- **Spot Trading**: Professional trading interface with real-time order books and recent trades
- **Multiple Order Types**: Market and limit orders with instant execution
- **Real-time Market Data**: Live price updates, 24h volume, price changes, and TVL (Total Value Locked)
- **Market Overview**: Top gainers, losers, DeFi protocols, and comprehensive market statistics
- **Favorites System**: Save and track your favorite trading pairs and DeFi pools

### Non-Custodial Wallet Management
- **Non-Custodial**: Full control of your private keys and assets - your keys, your crypto
- **Multi-Chain Support**: Manage assets across Ethereum, BSC, Polygon, and more
- **DeFi Integration**: Direct access to staking, farming, and liquidity pools from your wallet
- **Secure Deposits & Withdrawals**: Support for multiple blockchain networks and bridges
- **Transaction History**: Complete on-chain transaction tracking with status updates
- **Portfolio Overview**: Total portfolio value including staked assets, LP tokens, and rewards
- **Hide Balance Feature**: Privacy option to hide sensitive information

### User Experience
- **Professional Dashboard**: Portfolio overview with quick stats and recent activities
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Eye-friendly dark theme optimized for trading
- **Modern UI**: Built with Shadcn UI and Tailwind CSS
- **Real-time Updates**: Automatic data refresh every 5-10 seconds

### Security & Smart Contracts
- **Smart Contract Audited**: All DeFi protocols audited by leading security firms
- **Non-Custodial Security**: Assets remain in your wallet, never on centralized servers
- **Trustless Transactions**: All DeFi operations through transparent smart contracts
- **Authentication System**: Secure login and registration
- **Protected Routes**: Authorization guards for sensitive pages
- **Two-Factor Authentication**: Optional 2FA for enhanced security
- **Multi-Signature Support**: Enterprise-grade security for large holdings

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Web3 Wallet** (Optional): MetaMask, WalletConnect, or similar for DeFi features

## 🚀 Quick Start

Get started in 3 simple steps:

```bash
# 1. Clone the repository
git clone <repository-url>
cd corex-arc

# 2. Install dependencies
npm install

# 3. Run the application (frontend + backend)
npm run dev
```

That's it! 
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000

🎉

### Additional Commands

```bash
# Run frontend only
npm run dev:client

# Run backend only
npm run dev:server

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## ⚙️ Configuration (Optional)

### Frontend Environment Variables
Create `.env` file in root (optional):
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=CoreX
VITE_APP_VERSION=1.0.0
```

### Backend Configuration
Update `server/config/config.env` (if running backend):
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 📁 Project Structure

```
corex-arc/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── layouts/         # Layout components
│   │   │   └── MainLayout.tsx
│   │   ├── ui/              # Shadcn UI components
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Features.tsx
│   │   ├── Stats.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Landing page
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Trading.tsx
│   │   ├── Markets.tsx
│   │   ├── Wallet.tsx
│   │   ├── Settings.tsx
│   │   └── NotFound.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── services/            # API services
│   │   └── api.ts
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── server/                  # Backend API
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middlewares
│   └── config/              # Configuration files
├── public/                  # Static assets
└── package.json
```

## 🎯 Key Pages

### Landing Page (`/`)
- Hero section emphasizing DeFi ecosystem
- DeFi feature highlights (DEX, Yield Farming, Staking, etc.)
- TVL (Total Value Locked) statistics
- Multi-chain support showcase
- Footer with DeFi product links

### Dashboard (`/dashboard`)
- DeFi Portfolio overview with staked assets and LP tokens
- Total balance, P/L, and yield earnings
- Active DeFi positions (farms, pools, stakes)
- Recent trades and transactions
- Top performing DeFi protocols
- Quick actions for trading and farming

### Trading (`/trading`)
- DEX and Spot Trading interface
- Live order book with liquidity depth
- Recent trades and volume
- Buy/Sell forms with slippage protection
- Market/Limit orders
- Real-time price updates and APY rates

### Markets (`/markets`)
- All trading pairs and DeFi pools
- Market search and filters
- Top gainers/losers and highest APY farms
- TVL rankings for liquidity pools
- Favorites management
- Quick access to trade or provide liquidity

### Wallet (`/wallet`)
- Multi-chain asset balances
- Staked tokens and LP positions
- DeFi rewards and yield tracking
- Deposit/Withdrawal functionality
- Cross-chain bridge integration
- Transaction history (on-chain verified)
- Portfolio value including all DeFi positions

### Settings (`/settings`)
- Profile management
- Wallet connections (MetaMask, WalletConnect)
- Password change and 2FA
- DeFi notification preferences (yield alerts, pool updates)
- Gas fee settings
- Slippage tolerance configuration
- Privacy controls

## 🔧 API & Smart Contract Integration

The platform integrates with:
- **RESTful Backend API** for trading and user management
- **Web3 Integration** for DeFi smart contracts
- **Multi-Chain RPC Nodes** for Ethereum, BSC, Polygon, etc.
- **DEX Aggregators** for best swap rates
- **Yield Farming Protocols** for automated strategies

### Backend API Endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification
- `POST /api/auth/logout` - User logout

### Markets
- `GET /api/markets` - Get all markets
- `GET /api/markets/:pair` - Get specific market
- `GET /api/markets/top-gainers` - Top performing markets
- `GET /api/markets/top-losers` - Worst performing markets
- `GET /api/markets/:pair/history` - Price history

### Trading
- `GET /api/trading/orderbook/:pair` - Get order book
- `GET /api/trading/trades/:pair` - Get recent trades
- `POST /api/trading/orders` - Place new order
- `GET /api/trading/orders` - Get user orders
- `DELETE /api/trading/orders/:orderId` - Cancel order

### Wallet
- `GET /api/wallet/balances` - Get user balances
- `GET /api/wallet/summary` - Get wallet summary
- `GET /api/wallet/transactions` - Get transaction history
- `POST /api/wallet/deposit` - Create deposit
- `POST /api/wallet/withdraw` - Create withdrawal

### Properties (Assignment Implementation - Siddhant Pardhi(siddhantpardhi93@gmail.com))
- `POST /api/properties` - Create a new property
- `GET /api/properties` - Get all properties (with optional status filter and pagination)
- `GET /api/properties/:id` - Get property by ID
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

**Features:**
- Full CRUD operations for property management
- Validation using Zod schema validation
- Status filtering (available, sold, pending, draft)
- Pagination support (limit and offset)
- Comprehensive error handling (404 for not found, 400 for validation errors)
- In-memory data storage (array-based)
- Complete test suite with 18 passing tests

**Query Parameters:**
- `?status=available` - Filter properties by status
- `?limit=10` - Limit number of results
- `?offset=0` - Pagination offset

**Request Body Example (POST/PUT):**
```json
{
  "userId": "0123456789",
  "userName": "Ether",
  "title": "Beautiful House",
  "address": "0x12312313213",
  "price": 500000,
  "note": "Optional note",
  "status": "available"
}
```

## 📝 Property API Implementation Details

### Files Created:
1. **`server/models/Property.js`** - Property model with in-memory storage and PropertyService
   - Property class with validation
   - PropertyService with CRUD methods (create, findById, getAll, update, delete)
   - In-memory array storage

2. **`server/controllers/PropertyController.js`** - Property controller with all endpoint handlers
   - create() - POST /api/properties
   - getAll() - GET /api/properties
   - getById() - GET /api/properties/:id
   - update() - PUT /api/properties/:id
   - delete() - DELETE /api/properties/:id

3. **`server/routes/properties.js`** - Property routes configuration
   - All 5 routes with validation middleware
   - Query parameter validation for filtering and pagination

4. **`server/test/properties.test.js`** - Comprehensive test suite
   - 18 test cases covering all endpoints
   - Validation tests
   - Error handling tests
   - Status filtering tests
   - Pagination tests

### Files Modified:
1. **`server/middlewares/validation.js`** - Added property validation schemas
   - `createPropertySchema` - For POST requests
   - `updatePropertySchema` - For PUT requests (all fields optional)
   - `propertyQuerySchema` - For query parameter validation

2. **`server/index.js`** - Registered property routes
   - Added `app.use("/api/properties", propertyRoutes)`
   - Added test environment check to prevent server startup during tests

3. **`package.json`** - Added test scripts
   - `"test": "NODE_ENV=test jest --forceExit"`
   - `"test:watch": "NODE_ENV=test jest --watch"`
   - Added jest and supertest as dev dependencies

### Testing:
Run the test suite:
```bash
npm run test <relative-test-path>
```

All 18 tests pass, covering:
- Property creation (with required and optional fields)
- Validation errors (missing fields, invalid price, invalid status)
- Getting all properties with filtering and pagination
- Getting property by ID (success and 404 cases)
- Updating properties (single and multiple fields)
- Deleting properties (success and 404 cases)

## �� Styling & UI

- **Framework**: Tailwind CSS
- **Components**: Shadcn UI
- **Icons**: Lucide React
- **Theme**: Dark mode optimized for DeFi and trading
- **Colors**: Blue and purple gradient theme representing DeFi innovation
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design for DeFi on-the-go

## 🔐 Security Features

### Traditional Security
- JWT token-based authentication
- Password strength validation
- Protected routes with auth guards
- Automatic token refresh
- Secure API communication
- Input validation and sanitization

### DeFi Security
- Smart contract audits by leading firms
- Non-custodial architecture (assets never leave your wallet)
- Trustless smart contract execution
- Multi-signature wallet support
- Slippage protection on DEX trades
- Gas price optimization
- Front-running protection
- Transparent on-chain transactions

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚧 Development

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🌐 Multi-Chain Support

CoreX supports DeFi protocols across multiple blockchains:
- **Ethereum** - The original DeFi ecosystem
- **Binance Smart Chain (BSC)** - Low-cost DeFi alternatives
- **Polygon** - Fast and cheap transactions
- **Avalanche** - High-performance DeFi protocols
- **Arbitrum** - Ethereum Layer 2 scaling
- **Optimism** - Fast Ethereum L2 transactions

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI Components from [Shadcn UI](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Web3 Integration for DeFi protocols
- Smart Contract architecture

## 📞 Support

For support, email support@corex.com or join our Discord community.

---

**CoreX** - Decentralized Finance & Trading Platform 🚀  
*Decentralized. Trustless. Permissionless.*
