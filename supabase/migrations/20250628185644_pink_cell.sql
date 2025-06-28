/*
  # Create authority registration table

  1. New Tables
    - `auth_register`
      - `eid` (text, primary key) - Employee ID
      - `name` (text) - Authority name
      - `phno` (text) - Phone number
      - `email` (text) - Work email
      - `state` (text) - State code
      - `category` (text) - Complaint category
      - `department` (text) - Department name
      - `city` (text) - City name
      - `pass` (text) - Password
      - `created_at` (timestamp) - Registration timestamp

  2. Security
    - Enable RLS on `auth_register` table
    - Add policies for authority access
*/

CREATE TABLE IF NOT EXISTS auth_register (
  eid text PRIMARY KEY,
  name text NOT NULL,
  phno text NOT NULL,
  email text NOT NULL,
  state text NOT NULL,
  category text NOT NULL,
  department text NOT NULL,
  city text NOT NULL,
  pass text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE auth_register ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authorities can read own data"
  ON auth_register
  FOR SELECT
  TO authenticated
  USING (eid = current_setting('request.jwt.claims', true)::json->>'eid');

CREATE POLICY "Authorities can insert own data"
  ON auth_register
  FOR INSERT
  TO anon
  WITH CHECK (true);