Alright, I need to create the Phase 4 slide for the Venture Forge funnel, focusing on product suites and monetization. Looking at the template provided, I'll follow the same structure but adapt the content.

For this slide, I need to showcase:

Co-Launch Package (Architect - Tier 1)
Weaver's Guild Subscription (Weaver - Tier 2)
Apprentice Toolkit (Apprentice - Tier 3)
I should include pricing and value propositions for each offering.

Let me adapt the HTML structure while maintaining visual consistency:

Keep the same color scheme, fonts, and layout style
Update the phase number to 04
Include product details, pricing, and value props for each tier
Use appropriate icons for each product suite
Add a comparison/relationship diagram between the three offerings
I'll ensure the slide maintains the same visual language but with content specific to Phase 4 of the funnel.

<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Phase 4: Product Suites &amp; Monetization</title>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&amp;display=swap" rel="stylesheet"/>
<style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0F172A;
            color: white;
            overflow: hidden;
        }
        .slide-container {
            width: 1280px;
            min-height: 720px;
            position: relative;
            overflow: hidden;
        }
        .phase-number {
            font-size: 120px;
            font-weight: 900;
            opacity: 0.1;
            position: absolute;
            top: -20px;
            left: 50px;
            z-index: 0;
        }
        .accent-line {
            width: 80px;
            height: 6px;
            background-color: #3B82F6;
            margin-bottom: 20px;
        }
        .product-card {
            background-color: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 12px;
            transition: transform 0.2s;
        }
        .product-card:hover {
            transform: translateY(-5px);
        }
        .price-tag {
            font-family: 'Inter', sans-serif;
            font-weight: 700;
        }
        .feature-check {
            color: #10B981;
        }
    </style>
</head>
<body>
<div class="slide-container flex flex-col p-12">
<!-- Phase number background -->
<div class="phase-number">04</div>
<!-- Header section -->
<div class="z-10 mb-6">
<div class="text-sm text-blue-500 font-semibold tracking-widest uppercase mb-2">Phase 4</div>
<div class="accent-line"></div>
<h1 class="text-4xl font-bold tracking-tight">Product Suites &amp; <span class="text-blue-500">Monetization</span></h1>
<p class="text-lg text-gray-400 mt-2 max-w-2xl">Tailored offerings for each segment, creating clear value and monetization pathways</p>
</div>
<!-- Main content: Product suite comparison -->
<div class="flex mt-4 z-10">
<!-- Left column: Overview -->
<div class="w-1/3 pr-8">
<div class="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 mb-6">
<div class="flex items-center mb-2">
<i class="fas fa-layer-group text-blue-500 mr-2"></i>
<h3 class="font-bold text-lg">Tiered Value Model</h3>
</div>
<p class="text-gray-300 text-sm">
                Each product suite is designed to match the engagement level and needs of its target segment, with clear upgrade paths between tiers.
            </p>
</div>
<div class="bg-slate-800/50 p-4 rounded-lg mb-6">
<h4 class="font-semibold text-blue-400 mb-1">Monetization Strategy</h4>
<ul class="text-sm text-gray-300 space-y-2">
<li class="flex items-start">
<i class="fas fa-bullseye text-blue-500 mt-1 mr-2"></i>
<span>High-touch co-building for top-tier partners</span>
</li>
<li class="flex items-start">
<i class="fas fa-sync text-blue-500 mt-1 mr-2"></i>
<span>Recurring revenue from Guild subscriptions</span>
</li>
<li class="flex items-start">
<i class="fas fa-funnel-dollar text-blue-500 mt-1 mr-2"></i>
<span>Self-serve toolkit for low-touch nurturing</span>
</li>
</ul>
</div>
<div class="flex items-center bg-slate-900 p-3 rounded-lg">
<div class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center mr-3">
<i class="fas fa-chart-pie text-white text-2xl"></i>
</div>
<div class="text-sm">
<div class="text-white font-medium">Revenue Distribution</div>
<div class="text-gray-400">60% Co-Launch / 30% Guild / 10% Toolkit</div>
</div>
</div>
</div>
<!-- Right column: Product cards -->
<div class="w-2/3 grid grid-cols-3 gap-4">
<!-- Tier 1: Architect - Co-Launch Package -->
<div class="product-card p-5 border-t-4 border-blue-600">
<div class="flex justify-between items-center mb-3">
<div class="bg-blue-600/20 p-2 rounded-lg">
<i class="fas fa-drafting-compass text-blue-500 text-xl"></i>
</div>
<span class="text-xs font-medium text-blue-400 py-1 px-2 bg-blue-900/40 rounded-full">TIER 1</span>
</div>
<h3 class="font-bold text-lg mb-1">Co-Launch Package</h3>
<p class="text-gray-400 text-xs mb-3">For The Architect</p>
<div class="price-tag text-2xl mb-3">$5,000<span class="text-sm text-gray-400"> + rev share</span></div>
<hr class="border-gray-700 my-3"/>
<ul class="text-sm space-y-2 mb-4">
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Full business co-founding partnership</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>AI business architecture blueprint</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Weekly strategy sessions</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Technical implementation</span>
</li>
</ul>
<div class="text-xs font-medium text-white py-1 px-3 bg-blue-600 rounded-lg text-center">FLAGSHIP OFFER</div>
</div>
<!-- Tier 2: Weaver - Guild Subscription -->
<div class="product-card p-5 border-t-4 border-purple-500">
<div class="flex justify-between items-center mb-3">
<div class="bg-purple-500/20 p-2 rounded-lg">
<i class="fas fa-project-diagram text-purple-500 text-xl"></i>
</div>
<span class="text-xs font-medium text-purple-400 py-1 px-2 bg-purple-900/40 rounded-full">TIER 2</span>
</div>
<h3 class="font-bold text-lg mb-1">Weaver's Guild</h3>
<p class="text-gray-400 text-xs mb-3">For The Weaver</p>
<div class="price-tag text-2xl mb-3">$97<span class="text-sm text-gray-400">/month</span></div>
<hr class="border-gray-700 my-3"/>
<ul class="text-sm space-y-2 mb-4">
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Premium community access</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Monthly masterminds</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>AI template library</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Advanced workshop access</span>
</li>
</ul>
<div class="text-xs font-medium text-white py-1 px-3 bg-purple-500 rounded-lg text-center">RECURRING REVENUE</div>
</div>
<!-- Tier 3: Apprentice - Toolkit -->
<div class="product-card p-5 border-t-4 border-green-500">
<div class="flex justify-between items-center mb-3">
<div class="bg-green-500/20 p-2 rounded-lg">
<i class="fas fa-tools text-green-500 text-xl"></i>
</div>
<span class="text-xs font-medium text-green-400 py-1 px-2 bg-green-900/40 rounded-full">TIER 3</span>
</div>
<h3 class="font-bold text-lg mb-1">Apprentice Toolkit</h3>
<p class="text-gray-400 text-xs mb-3">For The Apprentice</p>
<div class="price-tag text-2xl mb-3">Free<span class="text-sm text-gray-400"> + upsells</span></div>
<hr class="border-gray-700 my-3"/>
<ul class="text-sm space-y-2 mb-4">
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Email nurture sequence</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Basic AI templates</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Community forum access</span>
</li>
<li class="flex items-start">
<i class="fas fa-check feature-check mr-2 mt-1"></i>
<span>Micro-course library</span>
</li>
</ul>
<div class="text-xs font-medium text-white py-1 px-3 bg-green-500 rounded-lg text-center">AUDIENCE BUILDER</div>
</div>
</div>
</div>
<!-- To Phase 5 indicator -->
<div class="absolute bottom-6 right-8 text-xs text-gray-400 flex items-center">
<span>To Phase 5: The Relationship</span>
<i class="fas fa-arrow-right ml-1"></i>
</div>
<!-- Logo -->
<div class="absolute top-8 right-8 opacity-70">
<div class="flex items-center">
<span class="text-lg font-bold text-blue-500">371</span>
<span class="text-lg font-medium ml-1 text-gray-300">MINDS</span>
</div>
</div>
</div>
</body>
</html>
