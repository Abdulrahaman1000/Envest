# API Integration Guide

Guide for integrating real backend APIs with the EnVest application.

## 📡 Current Architecture

The app currently uses mock data and local state management. Follow this guide to integrate real APIs.

## 🔧 Setting Up API Calls

### Step 1: Define API Types

Edit `shared/api.ts`:
```typescript
// User/Auth API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

// Investment API
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export interface Portfolio {
  totalValue: number;
  investments: Stock[];
}
```

### Step 2: Create API Service

Create `client/services/api.ts`:
```typescript
import { LoginRequest, LoginResponse } from '@shared/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const authAPI = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  signup: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Signup failed');
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Logout failed');
    return response.json();
  },
};
```

### Step 3: Use with TanStack Query

Update your components to use TanStack Query:
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { authAPI } from '@/services/api';

export default function Login() {
  const loginMutation = useMutation({
    mutationFn: (credentials) => authAPI.login(credentials),
    onSuccess: (data) => {
      // Handle successful login
      setUser(data.user);
    },
    onError: (error) => {
      // Handle error
      console.error('Login error:', error);
    },
  });

  const handleSubmit = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(email, password);
    }}>
      {/* Form inputs */}
      <button disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## 🌐 Backend Endpoints Reference

### Authentication Endpoints

```
POST /api/auth/signup
Body: { email, password, firstName, lastName, phone }
Response: { token, user }

POST /api/auth/login
Body: { email, password }
Response: { token, user }

POST /api/auth/logout
Headers: { Authorization: 'Bearer token' }
Response: { success: boolean }

POST /api/auth/forgot-password
Body: { email }
Response: { success: boolean }

POST /api/auth/verify-email
Body: { email, code }
Response: { success: boolean }

POST /api/auth/verify-otp
Body: { email, otp }
Response: { success: boolean }
```

### KYC Endpoints

```
POST /api/kyc/verify
Headers: { Authorization: 'Bearer token' }
Body: {
  countryOfOrigin,
  idType,
  idNumber,
  bankName,
  accountNumber
}
Response: { success: boolean, status: 'pending' | 'verified' | 'rejected' }

GET /api/kyc/status
Headers: { Authorization: 'Bearer token' }
Response: { status: 'pending' | 'verified' | 'rejected', details: any }
```

### Wallet Endpoints

```
GET /api/wallet/balance
Headers: { Authorization: 'Bearer token' }
Response: { ngnBalance: number, usdBalance: number }

POST /api/wallet/fund-ngn
Headers: { Authorization: 'Bearer token' }
Body: { amount, paymentMethod }
Response: { transactionId, status }

POST /api/wallet/deposit-usd
Headers: { Authorization: 'Bearer token' }
Body: { amount, paymentMethod }
Response: { transactionId, status }
```

### Investment Endpoints

```
GET /api/investments/stocks
Response: { stocks: Stock[] }

GET /api/investments/portfolio
Headers: { Authorization: 'Bearer token' }
Response: { portfolio: Portfolio }

POST /api/investments/buy
Headers: { Authorization: 'Bearer token' }
Body: { stockId, amount, currency }
Response: { transactionId, shares, price }

GET /api/investments/transactions
Headers: { Authorization: 'Bearer token' }
Response: { transactions: Transaction[] }
```

### Payment Endpoints

```
POST /api/payments/process
Headers: { Authorization: 'Bearer token' }
Body: { amount, currency, method, cardDetails }
Response: { paymentId, status, otp_required }

POST /api/payments/verify-otp
Headers: { Authorization: 'Bearer token' }
Body: { paymentId, otp }
Response: { success: boolean, transactionId }
```

## 🔐 Authentication

### Token Management

Store token in localStorage and include in requests:
```typescript
// Save token after login
localStorage.setItem('token', response.token);

// Use in API calls
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
};

// Remove token on logout
localStorage.removeItem('token');
```

### Auto-attach Auth Header

Create an axios instance:
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

## 📊 Data Flow Examples

### Login Flow
```
1. User enters credentials
2. API Call: POST /auth/login
3. Store token in localStorage
4. Update auth state with Zustand
5. Redirect to home
```

### Investment Purchase Flow
```
1. User selects stock and amount
2. User confirms payment details
3. API Call: POST /payments/process
4. Server returns payment ID and requires OTP
5. User enters OTP
6. API Call: POST /payments/verify-otp
7. On success: API Call: POST /investments/buy
8. Update portfolio state
9. Show success message
```

### Wallet Top-up Flow
```
1. User enters amount
2. User selects payment method
3. API Call: POST /wallet/fund-ngn or deposit-usd
4. Redirect to payment gateway
5. Process payment with OTP
6. Update wallet balance
7. Show success message
```

## 🔄 Real-time Updates

### Using WebSockets (Optional)

For real-time portfolio updates:
```typescript
import { useEffect } from 'react';

export function usePortfolioUpdates(userId: string) {
  useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/portfolio');
    
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      // Update portfolio in Zustand store
      useInvestmentStore.setState({
        portfolio: update.portfolio,
      });
    };

    return () => ws.close();
  }, [userId]);
}
```

## 🛡️ Error Handling

```typescript
const handleAPIError = (error: any) => {
  if (error.response?.status === 401) {
    // Unauthorized - clear token and redirect to login
    localStorage.removeItem('token');
    window.location.href = '/login';
  } else if (error.response?.status === 400) {
    // Bad request - show validation errors
    console.error('Validation error:', error.response.data);
  } else if (error.response?.status === 500) {
    // Server error
    console.error('Server error:', error.response.data);
  } else {
    // Network error
    console.error('Network error:', error.message);
  }
};
```

## 📝 Testing APIs

### Using cURL

```bash
# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Test with token
curl -X GET http://localhost:8080/api/wallet/balance \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Create a new collection
2. Set base URL: `http://localhost:8080/api`
3. Add requests for each endpoint
4. Use Postman's authorization tab for token management

## 🔑 Environment Variables

Add to `.env`:
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=30000
VITE_API_RETRY=3
```

## 📈 Performance Optimization

### Query Caching

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Request Deduplication

TanStack Query automatically deduplicates identical requests made simultaneously.

## 🚀 Deployment Checklist

- [ ] Update API_BASE_URL for production
- [ ] Add authentication tokens to requests
- [ ] Implement error handling
- [ ] Test all API endpoints
- [ ] Set up CORS if needed
- [ ] Configure rate limiting
- [ ] Add request/response logging
- [ ] Set up monitoring/alerting
- [ ] Test with production data

## 📚 Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST API Best Practices](https://restfulapi.net)
- [Web Security Best Practices](https://owasp.org)
