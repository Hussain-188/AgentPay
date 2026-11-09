# AgentPay — AI-Powered PayPal Command Center

AgentPay transforms PayPal from a payment processor into an intelligent financial operating system. An AI agent autonomously handles invoicing, payments, analytics, and dispute management — with human-in-the-loop approval gates for any operation that moves money.

**Small businesses spend 5+ hours/week on financial busywork.** AgentPay reduces that to minutes with conversational AI that executes real PayPal operations.

## Features

### AI Chat Agent
- Natural language interface to all PayPal operations
- Real-time tool call visualization showing each API call as it happens
- Multi-step autonomous workflows (e.g., "Create and send an invoice for web design services")
- Powered by Google Gemini AI with the official PayPal Agent Toolkit (47 tools across 8 API domains)

### Human-in-the-Loop Approval Gates
- Every money-moving operation requires explicit user approval
- Visual approval cards showing operation details, amounts, and recipients
- Dedicated approval queue with pending/approved/rejected history
- Autonomous but accountable — the AI suggests, you decide

### Financial Dashboard
- AG Grid-powered transaction and invoice tables with sorting, filtering, and pagination
- Custom cell renderers for status badges, currency formatting, and relative dates
- Revenue vs. expenses area chart and net income bar chart (Recharts)
- AI-generated financial insights with severity indicators

### PayPal API Coverage
| Domain | Operations |
|--------|-----------|
| Invoices | Create, list, get, send, remind, cancel, delete, QR code, search |
| Orders | Create, get, pay |
| Payments | Create refund, get refund |
| Disputes | List, get, accept claim |
| Shipment Tracking | Create, get, update |
| Products | Create, list, show |
| Subscriptions | Plans + subscriptions CRUD |
| Reporting | List transactions, merchant insights |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| AI | Vercel AI SDK v7 + Google Gemini 3.5 Flash |
| PayPal | `@paypal/agent-toolkit` (official 47-tool AI toolkit) |
| UI | TailwindCSS v4 + shadcn/ui |
| Data Grid | AG Grid Community (custom cell renderers) |
| Charts | Recharts (area + bar charts) |
| Animations | Framer Motion |
| State | Zustand |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                FRONTEND (Next.js App Router)             │
│  Chat Interface │ Dashboard (AG Grid+Charts) │ Approvals │
└────────┬────────────────────┬──────────────────┬────────┘
         │                    │                  │
┌────────▼────────────────────▼──────────────────▼────────┐
│              API LAYER (Next.js Route Handlers)          │
│  /api/chat (streamText    │ /api/insights │ /api/seed   │
│   + toolApproval)         │ (AI analysis) │ (demo data) │
└────────┬────────────────────┬───────────────────────────┘
         │                    │
┌────────▼────────────────────▼───────────────────────────┐
│                   AI AGENT LAYER                         │
│  System Prompts + PayPal Agent Toolkit (47 tools)        │
│  + Tool Approval for money-moving operations             │
└────────┬────────────────────────────────────────────────┘
         │
┌────────▼────────────────────────────────────────────────┐
│            PAYPAL SANDBOX (Live API Calls)                │
│  Orders │ Invoicing │ Transactions │ Disputes │ Catalog  │
│  Payments │ Subscriptions │ Reporting │ Shipment Tracking │
└──────────────────────────────────────────────────────────┘
```

## Getting Started

### Prerequisites

- **Node.js 18+** (check with `node -v`)
- **PayPal Developer account** (free — sandbox credentials)
- **Google AI API key** (free — no billing required)

### Step-by-Step Setup

#### 1. Clone and install

```bash
git clone https://github.com/Hussain-188/AgentPay.git
cd AgentPay
npm install
```

#### 2. Get your PayPal sandbox credentials (2 minutes)

1. Go to [developer.paypal.com](https://developer.paypal.com) and sign in (or create a free account)
2. Go to **Dashboard > Accounts** — ensure you have a **Business** sandbox account
3. Go to **Dashboard > Apps & Credentials** (make sure **Sandbox** toggle is selected)
4. Click **Create App**, name it "AgentPay", link it to your Business sandbox account
5. Enable these features: **Invoicing**, **Transaction Search**, **Subscriptions**
6. Copy the **Client ID** and **Secret**

#### 3. Get your Google AI API key (1 minute)

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click **Create API Key** — it's completely free, no billing required
3. Copy the key

#### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your keys:

```env
PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_CLIENT_SECRET=your_sandbox_secret_here
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key_here
```

#### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 6. Seed demo data (optional)

Click the **"Seed Data"** button in the top-right header to populate your PayPal sandbox with sample products and invoices.

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Add these environment variables in Vercel project settings:
   - `PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
4. Deploy — Vercel auto-detects Next.js and builds it

## Project Structure

```
agentpay/
├── app/
│   ├── layout.tsx                 # Root layout with sidebar navigation
│   ├── page.tsx                   # Landing page
│   ├── chat/page.tsx              # AI Chat interface
│   ├── dashboard/page.tsx         # Financial dashboard
│   ├── approvals/page.tsx         # Approval queue
│   └── api/
│       ├── chat/route.ts          # Chat endpoint (streamText + toolApproval)
│       ├── insights/route.ts      # AI financial insights
│       ├── transactions/route.ts  # Transaction data
│       ├── invoices/route.ts      # Invoice data
│       └── seed/route.ts          # Seed sandbox data
├── components/
│   ├── chat/                      # Chat UI components
│   ├── dashboard/                 # Dashboard, grids, charts
│   ├── layout/                    # Sidebar, Header, Logo
│   └── ui/                        # shadcn/ui primitives
├── lib/
│   ├── ai/                        # System prompts, custom tools
│   ├── paypal/                    # PayPal toolkit config, seeding
│   ├── store/                     # Approval store
│   ├── types/                     # TypeScript interfaces
│   └── utils/                     # Formatting, constants, mock data
└── .env.example                   # Environment variable template
```

## Key Implementation Details

### Tool Approval Pattern
Money-moving operations (`create_order`, `pay_order`, `send_invoice`, `create_refund`, etc.) are configured with `toolApproval: "user-approval"` in the `streamText` call. The AI SDK streams an approval request to the client, which renders an `ApprovalCard` with Approve/Reject buttons. The operation only executes after explicit user approval.

### Streaming Tool Visualization
Every PayPal API call made by the agent is rendered as an animated `ToolCallCard` in real-time. Users see the tool name, parameters, and status (running/complete/error) as the agent works through multi-step operations.

### AG Grid Integration
Transaction and invoice data is displayed in AG Grid with custom cell renderers (`StatusBadgeRenderer`, `AmountRenderer`, `DateRenderer`, `OverdueRenderer`) for a rich, interactive data experience with sorting, filtering, and pagination.

## Demo Script (3 Minutes)

1. **[0:00-0:15] Hook** — "Small businesses spend 5 hours/week on financial busywork. What if your PayPal account could think for itself?"
2. **[0:15-0:55] Invoice Creation** — Natural language to structured invoice, approval gate, sent via PayPal API
3. **[0:55-1:30] Agentic Commerce** — Create a subscription plan with product catalog entry, approval flow
4. **[1:30-2:05] Dashboard** — AG Grid tables, charts, AI insights panel
5. **[2:05-2:35] Batch Operations** — "Send reminders for all overdue invoices" with streaming tool calls
6. **[2:35-3:00] Close** — "47 AI tools, human-in-the-loop approval gates. Your finances on autopilot, with you always in the pilot's seat."

## Prize Categories Targeted

- **Best Use of PayPal + AI** — Official PayPal Agent Toolkit with 47 tools across 8 API domains
- **Best Use of Agentic Commerce** — Multi-step autonomous workflows with human-in-the-loop approval gates
- **Best Use of AG Grid** — Custom cell renderers, sorting, filtering, pagination for financial data
- **Most Creative** — Conversational financial management with real-time tool visualization
- **Most Impactful** — Solves real financial busywork for SMBs and freelancers

## Tools Used

| Tool | How It's Used |
|------|--------------|
| **PayPal Developer Platform** | Core integration — all financial operations (invoicing, orders, payments, disputes, subscriptions, products, reporting, shipment tracking) go through PayPal's sandbox APIs via the official Agent Toolkit |
| **PayPal Agent Toolkit** (`@paypal/agent-toolkit`) | Provides 47 pre-built AI tools across 8 API domains that the AI agent calls autonomously |
| **Google Gemini AI** (Gemini 3.5 Flash) | Powers the conversational AI agent — processes natural language, decides which PayPal tools to call, and generates responses |
| **Vercel AI SDK v7** | Handles streaming chat, tool calling orchestration, and the human-in-the-loop tool approval pattern |
| **AG Grid Community** | Interactive financial data tables with custom cell renderers, search, filtering, CSV export, and column pinning |
| **Next.js 16** | Full-stack framework — App Router, API routes, server-side rendering |
| **TailwindCSS v4 + shadcn/ui** | UI component system with dark mode support |
| **Recharts** | Revenue vs. expenses area chart and net income bar chart |
| **Framer Motion** | Animations for tool call cards and UI transitions |

## License

MIT License — see [LICENSE](LICENSE) for details.
