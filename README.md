# Party Treasury

A web-based gaming tool for roleplaying groups to manage party treasure, currency, valuables, and equipment. Built with Angular and Firebase, Party Treasury helps Game Masters and players keep track of loot, organize items, and split treasure efficiently.

## 🎯 Overview

Party Treasury solves the common problem of lost or disorganized treasure tracking in tabletop roleplaying games. When the person responsible for tracking treasure is unavailable or their notes are lost, the entire group suffers. This application provides a centralized, cloud-based solution that ensures your party's loot is always accessible and organized.

### Key Features

- **Secure Loot Management**: Keep your treasure secure and organized with drag-and-drop functionality between containers
- **Quick Treasure Splitting**: Split treasure between party members with a single click
- **Free Accounts**: All account types are free - no subscription required
- **Multi-User Access**: Game Masters can grant access to players with granular permissions
- **Three Core Areas**:
  - **Currency**: Track coins and monetary values
  - **Gems, Jewelry & Art**: Manage valuable items
  - **Items & Equipment**: Organize equipment into containers
- **Permission System**: Control access levels (view-only or full edit access) for different users
- **Theme Support**: Multiple Bootstrap themes available for customization
- **Reward Preparation**: Prepare and manage rewards for upcoming sessions
- **Vault History**: Track changes and history of your treasury

## 🛠️ Technology Stack

### Frontend
- **Angular 6**: Core framework
- **TypeScript 2.7**: Primary language
- **Bootstrap 4.3.1**: UI framework with multiple theme options
- **Angular Material 7.1.1**: Material Design components
- **ng-bootstrap 3.3.1**: Bootstrap components for Angular
- **ngx-datatable 13.1.0**: Data tables
- **Font Awesome 5.5.0**: Icons
- **RxJS 6.0**: Reactive programming

### Backend & Services
- **Firebase 5.7.1**: Backend-as-a-Service
  - Firebase Realtime Database
  - Firebase Authentication
  - Firebase Hosting
- **Firebase Functions 2.1.0**: Cloud functions for data cleanup
- **Firebase Admin SDK 6.5.0**: Server-side Firebase operations

### Development Tools
- **Angular CLI 6.1.5**: Development and build tooling
- **Karma & Jasmine**: Unit testing
- **Protractor**: End-to-end testing
- **TSLint**: Code linting
- **TypeScript**: Type checking

## 📁 Project Structure

```
treasury-app-master/
├── e2e/                          # End-to-end tests
├── functions/                     # Firebase Cloud Functions
│   ├── index.ts                  # Cloud function definitions
│   └── package.json              # Functions dependencies
├── public/                       # Static assets for hosting
├── src/
│   ├── app/
│   │   ├── admin/               # Admin module
│   │   │   ├── components/     # Admin components
│   │   │   │   ├── admin-console/
│   │   │   │   ├── bag-form/
│   │   │   │   ├── edition-form/
│   │   │   │   ├── manage-bags/
│   │   │   │   ├── manage-editions/
│   │   │   │   ├── manage-modifiers/
│   │   │   │   ├── manage-themes/
│   │   │   │   ├── manage-treasures/
│   │   │   │   ├── manage-valuables/
│   │   │   │   ├── manage-vaults/
│   │   │   │   └── [other admin forms]
│   │   │   └── services/        # Admin services
│   │   ├── common/              # Common services
│   │   ├── core/                # Core module
│   │   │   ├── components/      # Core components
│   │   │   │   ├── bs-navbar/   # Navigation
│   │   │   │   ├── faq/         # FAQ page
│   │   │   │   ├── home/        # Home page
│   │   │   │   ├── login/       # Login component
│   │   │   │   ├── privacy/     # Privacy policy
│   │   │   │   ├── terms/       # Terms of service
│   │   │   │   └── user-account/# User account
│   │   ├── creator/             # Creator/Vault management module
│   │   │   ├── components/      # Vault creation and management
│   │   │   │   ├── create-vault/
│   │   │   │   ├── user-vault/
│   │   │   │   ├── vault-history/
│   │   │   │   ├── reward-prep-form/
│   │   │   │   ├── manage-rules/
│   │   │   │   └── [prep components]
│   │   │   └── services/        # Prep services
│   │   ├── shared/              # Shared module
│   │   │   ├── components/      # Reusable components
│   │   │   ├── models/          # Data models
│   │   │   ├── pipes/           # Custom pipes
│   │   │   └── services/        # Shared services
│   │   ├── treasury/            # Treasury display module
│   │   │   ├── components/      # Treasury components
│   │   │   │   ├── treasury-display/
│   │   │   │   ├── display-currency/
│   │   │   │   ├── display-treasure/
│   │   │   │   ├── display-valuables/
│   │   │   │   └── split-currency/
│   │   │   └── services/        # Treasury services
│   │   ├── app.component.*      # Root component
│   │   └── app.module.ts        # Root module
│   ├── assets/                  # Static assets
│   │   ├── images/              # Image files
│   │   └── styles/              # Bootstrap theme CSS files
│   ├── environments/            # Environment configurations
│   ├── index.html               # Main HTML file
│   ├── main.ts                  # Application entry point
│   ├── polyfills.ts             # Browser polyfills
│   └── styles.scss              # Global styles
├── angular.json                  # Angular CLI configuration
├── firebase.json                 # Firebase configuration
├── database.rules.json           # Firebase Realtime Database rules
├── package.json                  # Project dependencies
└── tsconfig.json                # TypeScript configuration
```

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v8.x or higher recommended)
- **npm** (v5.x or higher) or **yarn**
- **Angular CLI** (v6.1.5 or compatible)
  ```bash
  npm install -g @angular/cli@6.1.5
  ```
- **Firebase CLI** (for deployment)
  ```bash
  npm install -g firebase-tools
  ```
- **Firebase Account**: A Firebase project with:
  - Realtime Database enabled
  - Authentication enabled (Email/Password, Google, etc.)
  - Hosting configured
  - Cloud Functions enabled

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd treasury-app-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Firebase Functions dependencies**
   ```bash
   cd functions
   npm install
   cd ..
   ```

4. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Realtime Database, Authentication, and Hosting
   - Copy your Firebase configuration

5. **Set up environment files**
   - Create `src/environments/environment.ts`:
     ```typescript
     export const environment = {
       production: false,
       firebase: {
         apiKey: "your-api-key",
         authDomain: "your-project.firebaseapp.com",
         databaseURL: "https://your-project.firebaseio.com",
         projectId: "your-project-id",
         storageBucket: "your-project.appspot.com",
         messagingSenderId: "your-sender-id"
       }
     };
     ```
   - Create `src/environments/environment.prod.ts` with production Firebase config

6. **Configure Firebase Database Rules**
   - Update `database.rules.json` with appropriate security rules
   - Deploy rules: `firebase deploy --only database`

## 🏃 Development

### Start Development Server

```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200/`

### Development Commands

- **Run development server**: `npm start` or `ng serve`
- **Run tests**: `npm test` or `ng test`
- **Run linting**: `npm run lint` or `ng lint`
- **Run e2e tests**: `npm run e2e` or `ng e2e`

### Firebase Functions Development

```bash
cd functions
npm run build    # Build TypeScript
npm run serve    # Serve functions locally
npm run lint     # Lint functions code
```

## 🏗️ Building for Production

### Build the Application

```bash
npm run build
# or
ng build --prod
```

This creates an optimized production build in `dist/treasury-app/`

### Build Configuration

The production build includes:
- Ahead-of-Time (AOT) compilation
- Tree shaking
- Minification
- Source map generation (disabled in prod)
- CSS extraction
- Build optimization

## 🚢 Deployment

### Deploy to Firebase Hosting

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Initialize Firebase** (if not already done)
   ```bash
   firebase init
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```
   Or deploy specific services:
   ```bash
   firebase deploy --only hosting      # Deploy hosting only
   firebase deploy --only functions     # Deploy functions only
   firebase deploy --only database     # Deploy database rules only
   ```

### Firebase Functions Deployment

The functions are automatically built and deployed when you run `firebase deploy`. The predeploy script runs:
- Linting
- TypeScript compilation

## 🏛️ Architecture

### Module Structure

The application follows a modular architecture:

1. **Core Module** (`core/`)
   - Home page
   - Authentication
   - Navigation
   - User account management
   - FAQ, Privacy, Terms pages

2. **Creator Module** (`creator/`)
   - Vault creation and management
   - Reward preparation
   - Rule management
   - History tracking

3. **Treasury Module** (`treasury/`)
   - Treasury display
   - Currency management
   - Treasure and valuables display
   - Currency splitting

4. **Admin Module** (`admin/`)
   - Admin console
   - Theme management
   - Bag management
   - Edition management
   - Modifier management
   - Treasure and valuables management
   - Vault administration

5. **Shared Module** (`shared/`)
   - Reusable components
   - Shared services
   - Data models
   - Custom pipes

### Data Models

Key models include:
- **Vault**: Main treasury container
- **Currency**: Monetary values and coins
- **Treasure**: Items and equipment
- **Valuables**: Gems, jewelry, and art
- **Bag**: Container for organizing items
- **Permission**: User access control
- **Theme**: UI theme configuration
- **Edition**: Game edition settings
- **Modifier**: Value modifiers
- **RewardPrep**: Prepared rewards for sessions

### Services

- **VaultService**: Vault operations
- **AuthService**: Authentication
- **UserService**: User management
- **ThemeService**: Theme management
- **CurrencyService**: Currency operations
- **PrepCoinService**: Coin preparation
- **PrepTreasureService**: Treasure preparation
- **PrepValuablesService**: Valuables preparation
- **TreasuryCurrencyService**: Treasury currency operations
- **GoogleAnalyticsService**: Analytics tracking

### Guards

- **AuthGuard**: Protects routes requiring authentication
- **AdminAuthGuard**: Protects admin routes
- **TreasureGuard**: Protects treasury access

## 🔥 Firebase Functions

The application includes Firebase Cloud Functions for data cleanup:

1. **deleteInvalidPermissions**: Removes permissions when a vault is deleted
2. **deleteInvalidCurrencies**: Removes currencies when a vault is deleted
3. **deleteInvalidDefaultValuables**: Removes default valuables when an edition is deleted
4. **deleteInvalidDefaultTreasures**: Removes default treasures when an edition is deleted

These functions ensure data consistency and prevent orphaned records.

## 🎨 Theming

The application supports multiple Bootstrap themes located in `src/assets/styles/`:
- Cerulean, Cosmo, Cyborg, Darkly, Flatly, Journal, Litera, Lumen, Lux, Materia, Minty, Pulse, Sandstone, Simplex, Sketchy, Slate, Solar, Spacelab, Superhero, United, Yeti

Users can select themes through the admin interface.

## 🔐 Security

- Firebase Authentication for user management
- Route guards for protected pages
- Firebase Realtime Database security rules
- Admin-only access controls
- Permission-based vault access

## 📝 Features in Detail

### Vault Management
- Create and manage multiple vaults
- Set vault properties (currency types, markups, permissions)
- Enable/disable features (treasury split, transfer in/out, reward prep)
- Theme customization per vault

### Currency Management
- Track multiple currency types
- Automatic conversion and calculations
- Split currency between party members
- Markup configuration for buying/selling

### Item Organization
- Drag-and-drop items between containers
- Organize treasures and valuables into bags
- Edit item properties
- Track item history

### Permission System
- Grant access to specific users
- Control access levels (view-only or edit)
- Restrict access to specific areas (currency, valuables, treasures)

### Reward Preparation
- Prepare rewards for upcoming sessions
- Manage coin, treasure, and valuables preparation
- Link rewards to specific vaults

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### End-to-End Tests
```bash
npm run e2e
```

## 📄 License

See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions, issues, or feature requests, please check the FAQ section in the application or open an issue in the repository.

## 🔮 Future Plans

- Support for additional gaming systems beyond fantasy
- Enhanced mobile experience
- Offline support
- Export/import functionality
- Advanced reporting and analytics

---

**Note**: This application requires a Firebase project to function. Make sure to configure your Firebase credentials before running the application.

