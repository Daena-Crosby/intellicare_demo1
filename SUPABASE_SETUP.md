# Supabase Setup Guide for Intellibus Care Foundation

## Overview
This guide covers setting up Supabase for:
1. Doctor registration form data storage
2. AI notetaking transcript ingestion via webhooks

---

## 1. Environment Variables

Add these environment variables to your project:

### Required for Client-Side (add NEXT_PUBLIC_ prefix):
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

### Required for Edge Functions (Supabase will auto-provide these):
\`\`\`env
SUPABASE_URL=your-project-url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

**How to get these values:**
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/service_role keys

---

## 2. Database Setup

### Option A: Run SQL Scripts in Supabase Dashboard
1. Go to Supabase Dashboard > SQL Editor
2. Run `scripts/01_create_doctors_table.sql`
3. Run `scripts/02_create_transcripts_table.sql`

### Option B: Use Supabase CLI (if installed locally)
\`\`\`bash
supabase db push
\`\`\`

---

## 3. Deploy the Webhook Edge Function

### Prerequisites:
Install Supabase CLI:
\`\`\`bash
npm install -g supabase
\`\`\`

### Login to Supabase:
\`\`\`bash
supabase login
\`\`\`

### Link your project:
\`\`\`bash
supabase link --project-ref your-project-ref
\`\`\`

### Deploy the transcript webhook function:
\`\`\`bash
supabase functions deploy transcript-webhook
\`\`\`

### Get your webhook URL:
After deployment, your webhook URL will be:
\`\`\`
https://your-project-ref.supabase.co/functions/v1/transcript-webhook
\`\`\`

---

## 4. Configure Your AI Notetaking Service

### For Fireflies.ai:
1. Go to Fireflies Settings > Integrations > Webhooks
2. Add webhook URL: `https://your-project-ref.supabase.co/functions/v1/transcript-webhook`
3. Select events: "Meeting Completed"
4. Save

### For Granola:
1. Go to Granola Settings > Integrations
2. Add Custom Webhook
3. Paste webhook URL
4. Configure trigger events
5. Save

### For Other Services (Otter, etc.):
Most AI notetaking services support webhooks. Look for:
- Integrations or API settings
- Webhook or Custom Integration options
- Add the Supabase Edge Function URL

---

## 5. Testing the Webhook

### Test with curl:
\`\`\`bash
curl -X POST \
  https://your-project-ref.supabase.co/functions/v1/transcript-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "meeting_id": "test-123",
    "title": "Test Meeting",
    "transcript": "This is a test transcript",
    "participants": ["John", "Jane"],
    "source": "test"
  }'
\`\`\`

### Check Supabase Logs:
1. Go to Supabase Dashboard > Edge Functions
2. Select `transcript-webhook`
3. View logs to see incoming requests

---

## 6. Webhook Payload Format

The Edge Function expects this general structure (adjust based on your service):

\`\`\`json
{
  "meeting_id": "unique-meeting-id",
  "title": "Meeting Title",
  "date": "2025-01-15T10:00:00Z",
  "transcript": "Full meeting transcript text...",
  "summary": "Optional meeting summary",
  "participants": ["John Doe", "Jane Smith"],
  "duration": 3600,
  "recording_url": "https://...",
  "source": "fireflies"
}
\`\`\`

**Note:** Once you provide the actual webhook format from your AI service, we can customize the Edge Function to parse it correctly.

---

## 7. Security Best Practices

1. **Enable Row Level Security (RLS)** - Already configured in SQL scripts
2. **Use service_role key only in Edge Functions** - Never expose in client code
3. **Validate webhook signatures** - Add signature verification if your service provides it
4. **Monitor Edge Function logs** - Check for unauthorized access attempts

---

## 8. Querying Transcripts

### From your app (authenticated users):
\`\`\`typescript
import { supabase } from '@/lib/supabaseClient'

const { data, error } = await supabase
  .from('transcripts')
  .select('*')
  .order('meeting_date', { ascending: false })
\`\`\`

### Filter by date:
\`\`\`typescript
const { data, error } = await supabase
  .from('transcripts')
  .select('*')
  .gte('meeting_date', '2025-01-01')
  .order('meeting_date', { ascending: false })
\`\`\`

---

## Next Steps

1. Add your Supabase environment variables to Vercel/your hosting platform
2. Run the SQL scripts to create the tables
3. Deploy the Edge Function
4. Configure your AI notetaking service webhook
5. Test with a real meeting transcript

Once you provide the webhook URL from your AI service, I can help customize the Edge Function to parse the specific payload format.
\`\`\`

```json file="" isHidden
