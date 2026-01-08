# StoreOS Styling Guide

## Colors

### Background & Cards
- **Background**: `#F9FAFB` (Light gray)
- **Cards**: `#FFFFFF` (White)

### Primary Colors
- **Primary**: `#4F46E5` (Indigo-600)
- **Text Primary**: `#111827` (Gray-900)
- **Text Secondary**: `#6B7280` (Gray-500)
- **Borders**: `#E5E7EB` (Gray-200)

### Badge Colors
- **Success**: Background `#D1FAE5` (Green-100) / Text `#059669` (Green-600)
- **Warning**: Background `#FFEDD5` (Orange-100) / Text `#EA580C` (Orange-600)
- **Info**: Background `#DBEAFE` (Blue-100) / Text `#2563EB` (Blue-600)

## Typography

### Font
- **Font Family**: Inter (configured in `app/layout.tsx`)

### Font Sizes & Weights
- **Page Title**: 28px, bold (700)
  - Use class: `text-page-title` or `text-[28px] font-bold`
- **Section Title**: 16px, semibold (600)
  - Use class: `text-section-title` or `text-base font-semibold`
- **Table Text**: 14px
  - Use class: `text-table` or `text-sm`
- **Badge Text**: 12px
  - Use class: `text-badge` or `text-xs`

## Usage Examples

### Page Title
```tsx
<h1 className="text-page-title text-[#111827]">Page Title</h1>
```

### Section Title
```tsx
<h2 className="text-section-title text-[#111827]">Section Title</h2>
```

### Card
```tsx
<div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
  {/* Card content */}
</div>
```

### Badges
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">New</Badge>
```

Or use utility classes:
```tsx
<span className="badge-success px-2.5 py-0.5 rounded-full">Success</span>
<span className="badge-warning px-2.5 py-0.5 rounded-full">Warning</span>
<span className="badge-info px-2.5 py-0.5 rounded-full">Info</span>
```

## Tailwind Configuration

All colors and typography are configured in:
- `tailwind.config.ts` - Custom colors and font sizes
- `app/globals.css` - CSS variables and utility classes

## Components

### Badge Component
Located at `components/ui/badge.tsx` with variants:
- `default` - Primary indigo
- `success` - Green badge
- `warning` - Orange badge
- `info` - Blue badge
- `secondary` - Gray badge
- `outline` - Outlined badge

