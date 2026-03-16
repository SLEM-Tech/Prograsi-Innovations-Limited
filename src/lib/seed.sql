-- ============================================================
-- prograsi Seed Data — Premium Modern Furniture & Home Decor
-- Run via: GET /api/db/seed?secret=seed-db-2024
-- ============================================================

-- ── 1. Categories ───────────────────────────────────────────

-- Parent categories
INSERT INTO prograsi_categories (name, slug, description, parent_id, image_url, count) VALUES
  ('Seating & Sofas',   'seating-sofas',   'Ergonomic comfort for the modern living space', NULL, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 0),
  ('Tables & Desks',    'tables-desks',    'Solid wood and marble surfaces for work and dining', NULL, 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800', 0),
  ('Lighting',          'lighting',        'Architectural pendants, floor lamps and desk lights', NULL, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800', 0),
  ('Storage & Shelving','storage-shelving','Minimalist cabinets, bookshelves and wardrobes', NULL, 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800', 0),
  ('Home Decor',        'home-decor',      'Hand-crafted rugs, vases and wall art', NULL, 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?w=800', 0),
  ('Office Furniture',  'office-furniture','Productivity-focused chairs and workstations', NULL, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', 0)
ON CONFLICT (slug) DO NOTHING;

-- Sub-categories
INSERT INTO prograsi_categories (name, slug, description, parent_id, image_url, count)
SELECT 'Lounge Chairs', 'lounge-chairs', 'Premium accent seating', id, 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800', 0
FROM prograsi_categories WHERE slug = 'seating-sofas' ON CONFLICT (slug) DO NOTHING;

INSERT INTO prograsi_categories (name, slug, description, parent_id, image_url, count)
SELECT 'Pendant Lights', 'pendant-lights', 'Sculptural ceiling fixtures', id, 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=800', 0
FROM prograsi_categories WHERE slug = 'lighting' ON CONFLICT (slug) DO NOTHING;

-- ── 2. Products (30 Items) ──────────────────────────────────

INSERT INTO prograsi_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status) VALUES
-- Seating
('Nordic Velvet Sofa', 'nordic-velvet-sofa', 'FUR-NVS-01', 'Hand-upholstered velvet sofa with solid oak legs. Features deep-seating foam and a kiln-dried hardwood frame for long-lasting durability.', 'Three-seater premium velvet sofa in Emerald Green', 450000, 520000, 450000, 'instock', 10, 15, 4.80, 'publish'),
('Eames Style Lounge Chair', 'eames-lounge-chair', 'FUR-ELC-02', 'The pinnacle of mid-century design. Molded plywood shells with top-grain Italian leather and an aluminum swivel base.', 'Iconic leather lounge chair and ottoman set', 380000, 380000, 0, 'instock', 5, 22, 4.95, 'publish'),
('Minimalist Wingback Chair', 'minimalist-wingback', 'FUR-MWB-03', 'A modern take on a classic silhouette. Breathable linen fabric and tapered walnut legs.', 'Contemporary linen accent chair', 125000, 145000, 125000, 'instock', 15, 8, 4.40, 'publish'),
('Bouclé Swivel Chair', 'boucle-swivel', 'FUR-BSC-04', 'Soft, textured bouclé fabric meets a smooth 360-degree swivel mechanism.', 'Cozy white bouclé accent chair', 185000, 210000, 185000, 'instock', 12, 11, 4.70, 'publish'),
('Tan Leather Daybed', 'leather-daybed', 'FUR-LDB-05', 'Top-grain leather cushion on a sleek steel frame. Perfect for office lounges or open-plan living rooms.', 'Genuine leather minimalist daybed', 290000, 320000, 290000, 'instock', 4, 6, 4.85, 'publish'),

-- Tables
('Carrara Marble Dining Table', 'carrara-marble-table', 'TAB-CMT-06', 'Stunning solid Carrara marble top with a brushed gold geometric base. Seats six comfortably.', 'Luxury marble dining table with gold legs', 850000, 950000, 850000, 'instock', 3, 14, 4.90, 'publish'),
('Walnut Floating Desk', 'walnut-floating-desk', 'TAB-WFD-07', 'Wall-mounted workspace made from sustainably sourced American Walnut. Includes integrated cable management.', 'Space-saving solid walnut home office desk', 95000, 110000, 95000, 'instock', 20, 31, 4.60, 'publish'),
('Nesting Coffee Tables', 'nesting-coffee-tables', 'TAB-NCT-08', 'Set of two circular tables. Black tempered glass tops with thin matte black powder-coated frames.', 'Modern industrial nesting table set', 65000, 75000, 65000, 'instock', 25, 42, 4.30, 'publish'),
('Live Edge Oak Table', 'live-edge-oak-table', 'TAB-LEO-09', 'One-of-a-kind slab of white oak with a natural live edge. Heavy industrial steel U-legs.', 'Hand-crafted live edge dining table', 580000, 580000, 0, 'instock', 2, 5, 5.00, 'publish'),
('Minimalist Bedside Pedestal', 'minimalist-pedestal', 'TAB-MBP-10', 'Single drawer floating bedside table in a clean matte white finish.', 'Sleek white 1-drawer nightstand', 45000, 50000, 45000, 'instock', 40, 19, 4.50, 'publish'),

-- Lighting
('Aura Glass Pendant', 'aura-glass-pendant', 'LIT-AGP-11', 'Hand-blown smoked glass orb with a warm Edison filament. Adjustable brass cable.', 'Smoked glass sphere ceiling light', 32000, 38000, 32000, 'instock', 50, 28, 4.75, 'publish'),
('Solaris Arc Floor Lamp', 'solaris-arc-lamp', 'LIT-SAL-12', 'Dramatic overhanging arc lamp with a heavy marble base and linen shade.', 'Large 7-foot arc floor lamp for living rooms', 85000, 105000, 85000, 'instock', 15, 12, 4.65, 'publish'),
('Brutalist Concrete Lamp', 'brutalist-concrete-lamp', 'LIT-BCL-13', 'Cast concrete base with a raw linen shade. Each base features unique air-bubble textures.', 'Industrial concrete base table lamp', 28000, 28000, 0, 'instock', 22, 9, 4.20, 'publish'),
('Nebula Neon Tube', 'nebula-neon-tube', 'LIT-NNT-14', 'Custom LED neon tube suspended by acrylic wires. App-controlled RGB colors.', 'Futuristic smart RGB suspended light', 120000, 140000, 120000, 'instock', 8, 35, 4.80, 'publish'),
('Pivot Task Light', 'pivot-task-light', 'LIT-PTL-15', 'Full-range motion arm with dimmable LED. Designed for focused office work.', 'Adjustable aluminum LED desk lamp', 42000, 42000, 0, 'instock', 30, 14, 4.45, 'publish'),

-- Storage
('Vertical Bookshelf', 'vertical-bookshelf', 'STO-VBS-16', 'Powder-coated steel "invisible" bookshelf. Books appear to float against the wall.', 'Space-saving 10-tier floating bookshelf', 35000, 45000, 35000, 'instock', 60, 52, 4.60, 'publish'),
('Walnut Sideboard', 'walnut-sideboard', 'STO-WSB-17', 'Mid-century modern sideboard with slatted doors and soft-close hinges.', 'Hand-crafted walnut buffet cabinet', 220000, 250000, 220000, 'instock', 6, 8, 4.85, 'publish'),
('Industrial Locker Wardrobe', 'locker-wardrobe', 'STO-ILW-18', 'Heavy-duty steel construction with a vintage mesh finish. 4 internal shelves.', 'Vintage industrial metal wardrobe', 155000, 180000, 155000, 'instock', 10, 4, 4.10, 'publish'),
('Modular Floating Cubes', 'floating-cubes', 'STO-MFC-19', 'Set of 3 oak cubes. Arrange them in any pattern on your wall.', 'Natural oak modular wall shelves', 48000, 48000, 0, 'instock', 25, 21, 4.70, 'publish'),
('Midnight Bar Cabinet', 'midnight-bar-cabinet', 'STO-MBC-20', 'Deep navy blue lacquer finish with ribbed glass doors and internal LED lighting.', 'Luxury home bar storage unit', 320000, 360000, 320000, 'instock', 4, 3, 4.90, 'publish'),

-- Decor
('Abstract Geometric Rug', 'abstract-geometric-rug', 'DEC-AGR-21', 'Hand-tufted New Zealand wool. Featuring a muted 7-color palette.', 'Large 8x10 premium wool rug', 145000, 185000, 145000, 'instock', 12, 16, 4.80, 'publish'),
('Satin Brass Mirror', 'satin-brass-mirror', 'DEC-SBM-22', 'Over-sized circular mirror with a thin satin-finished brass frame.', 'Modern 36-inch round wall mirror', 55000, 65000, 55000, 'instock', 18, 27, 4.70, 'publish'),
('Onyx Sculptural Vase', 'onyx-sculptural-vase', 'DEC-OSV-23', 'Carved from solid black onyx stone. Polished finish.', 'Hand-carved natural stone decorative vase', 38000, 42000, 38000, 'instock', 20, 14, 4.60, 'publish'),
('Terra Cotta Planter Set', 'terracotta-planters', 'DEC-TCP-24', 'Set of 3 drainage-enabled pots with matching saucers.', 'Minimalist ceramic indoor plant pots', 22000, 25000, 22000, 'instock', 45, 56, 4.40, 'publish'),
('Concrete Wall Clock', 'concrete-wall-clock', 'DEC-CWC-25', 'Raw architectural concrete face with walnut wood hands. Silent movement.', '12-inch modern concrete wall clock', 18000, 18000, 0, 'instock', 35, 42, 4.55, 'publish'),

-- Office
('ErgoPro Mesh Chair', 'ergopro-mesh-chair', 'OFF-EPC-26', 'Full lumbar support with mesh backing for airflow. Adjustable headrest and armrests.', 'Professional high-back ergonomic office chair', 165000, 195000, 165000, 'instock', 25, 64, 4.70, 'publish'),
('Dual-Motor Standing Desk', 'standing-desk-pro', 'OFF-SDP-27', 'Powerful quiet motors with 4 memory presets. Solid white desktop.', 'Electric height-adjustable sit-stand desk', 285000, 320000, 285000, 'instock', 15, 38, 4.80, 'publish'),
('Cable Management Trunk', 'cable-management-trunk', 'OFF-CMT-28', 'Steel under-desk tray that hides all power bricks and messy wires.', 'Heavy-duty under-desk wire organizer', 12000, 15000, 12000, 'instock', 100, 89, 4.90, 'publish'),
('Felt Desk Mat (Large)', 'felt-desk-mat', 'OFF-FDM-29', 'Anti-slip recycled PET felt. Provides a soft surface for keyboard and mouse.', 'Extra large gray felt desk protector', 9500, 12000, 9500, 'instock', 80, 112, 4.85, 'publish'),
('Monitor Arm Mount', 'monitor-arm-pro', 'OFF-MAP-30', 'Gas-spring mechanism for effortless screen positioning. VESA compatible.', 'Single screen ergonomic monitor mount', 38000, 45000, 38000, 'instock', 30, 45, 4.75, 'publish')
ON CONFLICT (slug) DO NOTHING;

-- ── 3. Images (Professional Interior Photography) ────────────

INSERT INTO prograsi_product_images (product_id, src, name, alt, position)
SELECT id, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000', 'Velvet Sofa', 'Emerald Green Velvet Nordic Sofa', 0 FROM prograsi_products WHERE slug = 'nordic-velvet-sofa' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000', 'Lounge Chair', 'Classic Leather Eames Style Lounge Chair', 0 FROM prograsi_products WHERE slug = 'eames-lounge-chair' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1518005020453-6ec24af4b28c?w=1000', 'Arc Lamp', 'Solaris Large Arc Floor Lamp', 0 FROM prograsi_products WHERE slug = 'solaris-arc-lamp' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1000', 'Office Workspace', 'ErgoPro High Back Mesh Office Chair', 0 FROM prograsi_products WHERE slug = 'ergopro-mesh-chair' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1000', 'Sideboard', 'Mid-Century Walnut Sideboard Storage', 0 FROM prograsi_products WHERE slug = 'walnut-sideboard'
ON CONFLICT DO NOTHING;

-- ── 4. Attributes (Material & Colors) ────────────────────────

INSERT INTO prograsi_product_attributes (product_id, name, options, position)
SELECT id, 'Fabric Color', ARRAY['Emerald Green', 'Deep Navy', 'Slate Gray', 'Terracotta'], 0 FROM prograsi_products WHERE slug = 'nordic-velvet-sofa' ON CONFLICT DO NOTHING;

INSERT INTO prograsi_product_attributes (product_id, name, options, position)
SELECT id, 'Wood Finish', ARRAY['American Walnut', 'Natural Oak', 'Blackened Ash'], 0 FROM prograsi_products WHERE slug = 'walnut-sideboard' ON CONFLICT DO NOTHING;

INSERT INTO prograsi_product_attributes (product_id, name, options, position)
SELECT id, 'Size', ARRAY['Medium (6x8)', 'Large (8x10)', 'Extra Large (10x12)'], 0 FROM prograsi_products WHERE slug = 'abstract-geometric-rug' ON CONFLICT DO NOTHING;

-- ── 5. Category Links ───────────────────────────────────────

INSERT INTO prograsi_product_categories (product_id, category_id)
SELECT p.id, c.id FROM prograsi_products p, prograsi_categories c 
WHERE p.slug = 'nordic-velvet-sofa' AND c.slug IN ('seating-sofas') UNION ALL
SELECT p.id, c.id FROM prograsi_products p, prograsi_categories c 
WHERE p.slug = 'ergopro-mesh-chair' AND c.slug IN ('office-furniture') UNION ALL
SELECT p.id, c.id FROM prograsi_products p, prograsi_categories c 
WHERE p.slug = 'pivot-task-light' AND c.slug IN ('lighting')
ON CONFLICT DO NOTHING;

-- ── 6. Final Sync ───────────────────────────────────────────

UPDATE prograsi_categories c SET count = (SELECT COUNT(*) FROM prograsi_product_categories pc WHERE pc.category_id = c.id);