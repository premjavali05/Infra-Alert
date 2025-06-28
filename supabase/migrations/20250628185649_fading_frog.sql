/*
  # Create complaint table

  1. New Tables
    - `complaint`
      - `cid` (text, primary key) - Complaint ID
      - `phno` (text) - User phone number
      - `name` (text) - User name
      - `date` (date) - Complaint date
      - `state` (text) - State code
      - `category` (text) - Complaint category
      - `dept` (text) - Department
      - `city` (text) - City name
      - `district` (text) - District name
      - `description` (text) - Complaint description
      - `img_url` (text) - Image URL
      - `status` (text) - Complaint status
      - `solved_url` (text, nullable) - Solved image URL
      - `created_at` (timestamp) - Creation timestamp

  2. Security
    - Enable RLS on `complaint` table
    - Add policies for users and authorities
*/

CREATE TABLE IF NOT EXISTS complaint (
  cid text PRIMARY KEY,
  phno text NOT NULL,
  name text NOT NULL,
  date date NOT NULL,
  state text NOT NULL,
  category text NOT NULL,
  dept text NOT NULL,
  city text NOT NULL,
  district text NOT NULL,
  description text NOT NULL,
  img_url text NOT NULL,
  status text DEFAULT 'Pending',
  solved_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE complaint ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own complaints"
  ON complaint
  FOR SELECT
  TO authenticated
  USING (phno = current_setting('request.jwt.claims', true)::json->>'phone');

CREATE POLICY "Users can insert own complaints"
  ON complaint
  FOR INSERT
  TO authenticated
  WITH CHECK (phno = current_setting('request.jwt.claims', true)::json->>'phone');

CREATE POLICY "Authorities can read relevant complaints"
  ON complaint
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authorities can update complaint status"
  ON complaint
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Anonymous users can insert complaints"
  ON complaint
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anonymous users can read complaints"
  ON complaint
  FOR SELECT
  TO anon
  USING (true);