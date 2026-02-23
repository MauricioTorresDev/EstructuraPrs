CREATE TABLE IF NOT EXISTS institutions (
    institution_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_institution VARCHAR(20) UNIQUE NOT NULL,
    modular_code VARCHAR(20) UNIQUE,
    institution_name VARCHAR(200) NOT NULL,
    institution_type VARCHAR(50) NOT NULL,
    institution_level VARCHAR(50) DEFAULT 'INICIAL',
    gender VARCHAR(20),
    slogan TEXT,
    logo_url TEXT,
    address JSONB NOT NULL DEFAULT '{}',
    contact_methods JSONB DEFAULT '[]',
    schedules JSONB DEFAULT '[]',
    grading_type VARCHAR(50),
    classroom_type VARCHAR(50),
    ugel VARCHAR(100),
    dre VARCHAR(100),
    director_id UUID,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS classrooms (
    classroom_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(institution_id),
    classroom_name VARCHAR(100) NOT NULL,
    classroom_age VARCHAR(20) NOT NULL,
    capacity INTEGER CHECK (capacity > 0 AND capacity <= 30),
    color VARCHAR(20),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_classrooms_institution ON classrooms(institution_id);
CREATE INDEX IF NOT EXISTS idx_institutions_status ON institutions(status);
CREATE INDEX IF NOT EXISTS idx_institutions_ugel ON institutions(ugel);