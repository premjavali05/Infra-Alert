/*
  # Create location tracking table

  1. New Tables
    - `save_location`
      - `id` (uuid, primary key) - Unique identifier
      - `pno` (text) - Phone number
      - `img_url` (text, nullable) - Image URL
      - `latitude` (numeric) - GPS latitude
      - `longitude` (numeric) - GPS longitude
      - `address` (text) - Human readable address
      - `created_at` (timestamp) - Creation timestamp

  2. Security
    - Enable RLS on `save_location` table
    - Add policies for location data access
*/

CREATE TABLE IF NOT EXISTS save_location (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pno text NOT NULL,
  img_url text DEFAULT '',
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE save_location ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own location data"
  ON save_location
  FOR SELECT
  TO authenticated
  USING (pno = current_setting('request.jwt.claims', true)::json->>'phone');

CREATE POLICY "Users can insert own location data"
  ON save_location
  FOR INSERT
  TO authenticated
  WITH CHECK (pno = current_setting('request.jwt.claims', true)::json->>'phone');

CREATE POLICY "Users can update own location data"
  ON save_location
  FOR UPDATE
  TO authenticated
  USING (pno = current_setting('request.jwt.claims', true)::json->>'phone');

CREATE POLICY "Anonymous users can insert location data"
  ON save_location
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anonymous users can update location data"
  ON save_location
  FOR UPDATE
  TO anon
  USING (true);