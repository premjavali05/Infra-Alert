/*
  # Create user registration table

  1. New Tables
    - `u_register`
      - `phno` (text, primary key) - User phone number
      - `name` (text) - User full name
      - `email` (text) - User email address
      - `pass` (text) - User password
      - `created_at` (timestamp) - Registration timestamp

  2. Security
    - Enable RLS on `u_register` table
    - Add policy for users to read their own data
*/

CREATE TABLE IF NOT EXISTS u_register (
  phno text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  pass text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE u_register ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON u_register
  FOR SELECT
  TO authenticated
  USING (phno = current_setting('request.jwt.claims', true)::json->>'phone');

CREATE POLICY "Users can insert own data"
  ON u_register
  FOR INSERT
  TO anon
  WITH CHECK (true);