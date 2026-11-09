# AgentPay — AI-Powered PayPal Command Center

AgentPay transforms PayPal from a payment processor into an intelligent financial operating system. An AI agent autonomously handles invoicing, payments, analytics, and dispute management — with human-in-the-loop approval gates for any operation that moves money.

**Small businesses spend 5+ hours/week on financial busywork.** AgentPay reduces that to minutes with conversational AI that executes real PayPal operations.

## Features

### AI Chat Agent
- Natural language interface to all PayPal operations
- Real-time tool call visualization showing each API call as it happens
- Multi-step autonomous workflows (e.g., "Create and send an invoice for web design services")
- Powered by GPT-4o with the official PayPal Agent Toolkit (47 tools across 8 API domains)

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
| AI | Vercel AI SDK v7 + OpenAI GPT-4o |
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

- Node.js 18+
- PayPal Developer account (sandbox credentials)
- OpenAI API key

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd agentpay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your credentials:
   ```
   PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

   To get PayPal sandbox credentials:
   - Go to [developer.paypal.com](https://developer.paypal.com)
   - Create a sandbox application
   - Copy the Client ID and Secret

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000)

6. **(Optional) Seed sandbox data**
   Send a POST request to `/api/seed` to populate your PayPal sandbox with sample products and invoices.

### Deploy to Vercel

```bash
npm run build
```

Deploy via the [Vercel CLI](https://vercel.com/docs/cli) or connect your GitHub repository on [vercel.com](https://vercel.com). Set the three environment variables (`PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `OPENAI_API_KEY`) in your Vercel project settings.

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

## License

MIT License — see [LICENSE](LICENSE) for details.
