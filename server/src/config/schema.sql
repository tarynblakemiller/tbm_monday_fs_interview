-- Create fragrances table
CREATE TABLE IF NOT EXISTS fragrances (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR NOT NULL,
    image_url VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    quantity INTEGER NOT NULL,
    scent_profiles VARCHAR[] NOT NULL,
    status VARCHAR DEFAULT 'NEW',
    phone VARCHAR,
    monday_item_id VARCHAR,
    shipping_address TEXT,
    inscription_request TEXT,
    sales_associate VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create order_fragrances junction table
CREATE TABLE IF NOT EXISTS order_fragrances (
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    fragrance_id VARCHAR REFERENCES fragrances(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id, fragrance_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_monday_item_id ON orders(monday_item_id);
CREATE INDEX IF NOT EXISTS idx_fragrances_category ON fragrances(category);