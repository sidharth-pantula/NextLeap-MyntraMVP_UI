# Implementation Plan: AI-Powered Myntra Wishlist MVP

A 5-phase execution plan to build a fully functional MVP of the **Myntra web application** with an integrated, rules-based **AI Wishlist Prioritization Engine**, built strictly to match the finalized Stitch UI designs without requiring external LLM/API dependencies.

---

## Architecture & System Overview

```
                           +----------------------------------------------------+
                           |             Myntra Web App (React / Vite)          |
                           +----------------------------------------------------+
                                                     |
         +-------------------------------------------+------------------------------------------+
         |                                           |                                          |
+-------------------+                      +-------------------+                      +-------------------+
|  E-Commerce State |                      |  Product Catalog  |                      | AI Engine Modules |
| (Wishlist & Cart) |                      |  (20-25 Products) |                      | (No External LLM) |
+-------------------+                      +-------------------+                      +-------------------+
         |                                           |                                          |
         | • 15-20 saved items                       | • Occasions, Styles                      | • Intent Parser
         | • Persistent state                        | • Budget, Colors                         | • Adaptive Steps
         | • Add / Remove / Bag                      | • Categories, Fabrics                    | • Weighted Scorer
         |                                           |                                          | • Reason Generator
         +-------------------------------------------+------------------------------------------+ • Ask AI Refinement
                                                     |
                         +-------------------------------------------------------+
                         |                    Stitch UI Views                    |
                         |  Home • Wishlist • Intent • Questions • Loading •     |
                         |  Best Matches • Prioritized Grid • PDP • Bag Drawer   |
                         +-------------------------------------------------------+
```

---

## Phase 1: Project Setup, Design System & Rich Mock Product Catalog

### Objectives
Establish the frontend foundation, import exact Stitch design tokens, configure styling and fonts, and construct a realistic fashion dataset with structured metadata for scoring.

### Tasks & Deliverables
1. **Frontend Scaffolding:**
   - Initialize Vite + React (TypeScript) or vanilla modular build in workspace.
   - Configure Tailwind with exact Stitch color tokens (`#FF3F6C`, `#7952FF`, `#171c25`, `#dee2ef`, `#03A685`, `#f9f9ff`).
   - Import Google Fonts (`Hanken Grotesk`) and `Material Symbols Outlined`.
2. **Rich Mock Product Catalog (`src/data/products.ts`):**
   - Seed **20–25 realistic Myntra fashion items** across Men & Women (Ethnic Wear, Western Wear, Dresses, Lehengas, Kurtas, Co-ords, Gowns, Footwear, Bags, Accessories).
   - Structured metadata attributes for each item:
     ```typescript
     {
       id: "prod-01",
       brand: "Manyavar Mohey",
       title: "Dusty Rose Embroidered Silk Lehenga",
       price: 8999,
       originalPrice: 14999,
       discount: "40% OFF",
       rating: 4.6,
       reviewsCount: 840,
       category: "Women",
       subCategory: "Ethnic Wear",
       productType: "Lehenga",
       images: ["..."],
       sizes: ["S", "M", "L", "XL"],
       inStock: true,
       attributes: {
         occasions: ["Wedding", "Festive", "Cocktail"],
         styles: ["Traditional", "Elegant"],
         color: "Dusty Rose",
         colorFamily: "Pastel",
         fabric: "Silk",
         formality: "Ultra Formal",
         isFlashy: true,
         tags: ["embroidery", "silk", "pastel", "wedding guest", "bridal"]
       }
     }
     ```
3. **Application State Stores:**
   - `WishlistContext`: Initialized with 15–20 pre-saved diverse items from the catalog. Supports toggle, delete, and bag transfer.
   - `CartContext`: Manages Bag items, size choices, quantity, price breakdown, and checkout state.
   - `NavigationContext`: Controls active view routing (`home`, `wishlist`, `ai-intent`, `ai-questions`, `ai-loading`, `best-matches`, `prioritized-grid`, `pdp`, `bag`).

---

## Phase 2: Core Myntra E-Commerce UI & Standard Flows

### Objectives
Implement the standard Myntra browsing and shopping experiences using the exact Stitch UI specifications.

### Tasks & Deliverables
1. **Global Header & Navigation:**
   - Top navigation bar (`h-20`, sticky, white shadow) with Myntra logo, category tabs (**MEN, WOMEN, KIDS, HOME & LIVING, BEAUTY, STUDIO**), functional search bar, profile icon, active Wishlist counter badge, and Bag counter.
2. **Home Screen (`myntra_home_desktop`):**
   - Hero promotional banners, category tiles, trending fashion carousels, and product catalog grid.
   - Product cards with hover wishlist toggle and quick detail view.
3. **Standard Wishlist Screen (`myntra_wishlist_desktop`):**
   - Header with `My Wishlist (19 items)` and sorting dropdown (`Latest Added`, `Price: Low to High`, `Price: High to Low`, `Discount`).
   - **Marquee "Build Wishlist" Banner:** Frosted glass panel with gradient text, `auto_awesome` icon, and the prominent **"Build Wishlist"** CTA button.
   - 4-column product grid with delete buttons and slide-up `MOVE TO BAG` hover action.
4. **Product Detail Page (PDP) (`myntra_pdp_desktop`):**
   - 2x2 zoomable image gallery, brand/title header, green rating pill (`4.2 ★`), dynamic pricing with discount tags.
   - Interactive circular size selector (`S`, `M`, `L`, `XL`), size chart link.
   - **AI Context Card:** "Why you might like this" box with dynamic reasoning.
   - `ADD TO BAG` (brand pink) and `BUY NOW` (dark) functional buttons.
5. **Shopping Bag & Checkout Drawer:**
   - Bag summary, item count, size selection update, price breakdown (Total MRP, Discount on MRP, Convenience Fee, Total Amount), and "Place Order" confirmation flow.

---

## Phase 3: Lightweight AI Intent Extraction & Adaptive Questionnaire

### Objectives
Build the natural-language intent parser and adaptive question flow that responds intelligently to user inputs without hardcoding or requiring external LLM APIs.

### Tasks & Deliverables
1. **Rule-Based Intent Parser (`src/engine/intentParser.ts`):**
   - Extracts structured parameters from natural language via keyword dictionaries, token normalization, and regex:
     - **Occasion:** `wedding`, `reception`, `sangeet`, `party`, `cocktail`, `office`, `work`, `formal`, `vacation`, `beach`, `casual`, `brunch`, `date`.
     - **Budget:** `under 2000`, `under 5k`, `5000-10000`, `below 3000`, `budget`, `cheap`, `luxury`.
     - **Style:** `elegant`, `minimal`, `simple`, `trendy`, `bold`, `traditional`, `ethnic`, `chic`, `modern`, `less flashy`, `sober`.
     - **Category/Product:** `lehenga`, `saree`, `dress`, `maxi`, `gown`, `kurta`, `shirt`, `shoes`, `heels`, `bag`.
     - **Color/Tone:** `pastel`, `peach`, `emerald`, `black`, `ivory`, `red`, `bright`, `dark`.
2. **Intent Capture Screen (`ai_build_wishlist_intent_1` & `_2`):**
   - Centered frosted glass modal with textarea and character counter.
   - Quick suggestion chips: `Wedding`, `Vacation`, `Work`, `Birthday / Gift`, `Party`, `Something else ✏️`.
   - Forward button enables automatically upon user input.
3. **Adaptive Question Engine (`src/engine/adaptiveQuestions.ts`):**
   - Evaluates what attributes were already provided in the initial prompt.
   - Dynamically presents 2–4 sequential questions for missing attributes:
     - **Step 1 (Occasion):** 2x3 visual bento grid (Wedding, Party, Work, Vacation, Casual, Other).
     - **Step 2 (Style):** Visual photo cards (Elegant, Minimal, Trendy, Traditional, Casual).
     - **Step 3 (Budget):** Tiered radio pills (Under ₹2,000, ₹2,000–₹5,000, ₹5,000–₹10,000, ₹10,000+).
     - **Step 4 (Category):** Focus pills (Ethnic Wear, Western Wear, Footwear, Accessories, All).
   - Animated top progress bar (`Step X of N`) and smooth transition between steps.
4. **"Finding Matches" Processing Screen (`ai_finding_matches_loading`):**
   - Orbital glowing rings, rotating gradient mesh, and pulsing sparkle icon.
   - Animated text: *"Looking through your 19 saved items in Wishlist..."*.
   - 1.5s simulated processing delay before routing to results.

---

## Phase 4: Recommendation Engine, Explainability & Prioritized Views

### Objectives
Implement the transparent multi-attribute scoring engine that calculates individual Match % for all saved items, generates explainable reasoning, and renders the Best Matches & Prioritized Grid.

### Tasks & Deliverables
1. **Deterministic Scoring Engine (`src/engine/scorer.ts`):**
   - Calculates relevance score ($0 - 100\%$) for every item in the user's wishlist:
     $$\text{Score} = (W_{occ} \cdot S_{occ}) + (W_{style} \cdot S_{style}) + (W_{budget} \cdot S_{budget}) + (W_{cat} \cdot S_{cat}) + (W_{attr} \cdot S_{attr})$$
   - **Occasion Weight (35%):** Exact match = 100%, related = 60%, neutral = 20%.
   - **Style Weight (25%):** Matches style tags/attributes.
   - **Budget Weight (20%):** In-budget = 100%, slight exceed = 60%, heavy exceed = 10%.
   - **Category Weight (15%):** Direct match = 100%.
   - **Color & Fabric Synergy (5%):** Bonus for matching tone/materials.
   - Normalizes output to integer percentages (e.g., `98%`, `94%`, `87%`, `64%`, `38%`).
2. **Explainability & Reason Generator (`src/engine/reasonGenerator.ts`):**
   - Generates 2–3 data-backed bullet points for top matches:
     - *"Fits your budget perfectly (₹5k–10k)"*
     - *"Matches your style: Elegant minimalistic embroidery"*
     - *"Suitable for occasion: Classic silhouette ideal for Wedding"*
3. **Top 5 Best Matches View (`ai_best_matches_desktop`):**
   - Header with active intent chip (`Based on: Wedding • Elegant • ₹5,000–₹10,000 ✨`).
   - 12-column Hero Card for #1 Match with detailed "Why this is your top match" green checkmark card.
   - 3-column sub-grid for matches #2, #3, #4, #5 with individual % pills and compact reasons.
4. **Unified Prioritized Wishlist Grid (`myntra_wishlist_ai_prioritized_grid`):**
   - Unified 5-column grid containing all saved wishlist products sorted descending by score.
   - **No artificial section splits** (maintains one single Myntra wishlist).
   - Match % badge on top-left of each product card with hover popover showing "Why this matches".

---

## Phase 5: "Ask AI" Conversational Refinement & Verification

### Objectives
Build the dynamic refinement layer ("Ask AI") that modifies ranking in real time and verify the complete end-to-end journey across multiple distinct shopping intents.

### Tasks & Deliverables
1. **Docked "Ask AI" Refinement Widget:**
   - Fixed floating frosted pill widget at bottom center of prioritized views.
   - Quick refinement chips:
     - `✨ Show me only dresses`
     - `Remove anything over ₹5,000`
     - `I want something less flashy`
     - `Change to pastel colors`
     - `Find best value`
   - Custom freeform text input with send button.
2. **Dynamic Refinement Handler (`src/engine/refinementHandler.ts`):**
   - Adjusts active filter constraints and attribute weights upon user request:
     - *"Less flashy"* $\rightarrow$ penalizes embellished/party items, boosts minimal/classic items.
     - *"Under ₹5,000"* $\rightarrow$ updates `budgetMax` to 5000 and recalculates scores.
     - *"Best value"* $\rightarrow$ boosts high-discount and lower-priced items.
   - Smooth CSS transition animating cards into their newly reordered positions.
3. **End-to-End User Journey Verification:**
   - **Scenario A (Wedding Occasion):** *"I need an elegant outfit for my friend's wedding between ₹5k-10k"* $\rightarrow$ Lehengas/Gowns rank top with 90%+ matches.
   - **Scenario B (Casual / Vacation):** *"Looking for lightweight vacation dresses under ₹2,000"* $\rightarrow$ Cotton floral maxi dresses & relaxed wear jump to top rank.
   - **Scenario C (Work / Formal):** *"Office formal shirts and trousers"* $\rightarrow$ Blazers & tailored items score highest.
   - **Scenario D (Refinement Flow):** Submit query $\rightarrow$ View Top 5 $\rightarrow$ Click "Show me something less flashy" $\rightarrow$ Wishlist re-ranks dynamically $\rightarrow$ Open PDP $\rightarrow$ Select size $\rightarrow$ Add to Bag $\rightarrow$ Checkout.

---

## Implementation Phase Summary & Timeline

| Phase | Focus Area | Key Output | Verification Criteria |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Foundation & Dataset | Project scaffold, Tailwind tokens, 20–25 mock products with structured attributes, Context stores. | State initializes with 15–20 pre-saved items; tokens match Stitch palette. |
| **Phase 2** | Core E-Commerce Flows | Sticky Nav, Home Page, Baseline Wishlist with AI CTA, PDP, Bag drawer. | Full browsing, size select, wishlist toggle, and add-to-bag work seamlessly. |
| **Phase 3** | Intent & Questionnaire | Intent parser, Intent modal, 4 adaptive question steps, animated loading screen. | Prompts extract structured criteria; questions adapt to missing info. |
| **Phase 4** | Scoring & Prioritized Grid | Multi-attribute scoring engine, Top 5 Bento view, Unified prioritized wishlist grid with match badges. | Items receive dynamic data-backed % scores; unified grid sorted high-to-low. |
| **Phase 5** | Refinement & Validation | Docked "Ask AI" widget, real-time re-ranking, multi-intent testing & edge cases. | Refinements recalculate scores dynamically; complete journey tested end-to-end. |
