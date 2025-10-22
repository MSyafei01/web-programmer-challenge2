# Database Setup Guide

## Quick Start
1. Install MySQL on your system
2. Create database: `web_programmer_challenge`
3. Run the backend - tables will be created automatically

## Manual Setup
```bash
# Login to MySQL
mysql -u root -p

# Run schema file
SOURCE backend/database/schema.sql;

# Run seeds file  
SOURCE backend/database/seeds.sql;