# 🚀 LOS Application Multi-Stage Playwright Automation Framework

This is a modular, Page Object Model (POM) automation repository structured for a **4-member team** to automate the 11 functional stages of the Loan Origination System (LOS).

---

## 🏗️ Team Assignment Matrix


| Team Member | Assigned Workflow Segment | Page Objects to Maintain (`pages/`) | Test File (`tests/stages/`) |
| :--- | :--- | :--- | :--- |
| **Member A** | 1. Application Submitted <br>2. Sales Login | `01-submission.page.js`<br>`02-sales-login.page.js` | `stage1-initiation.spec.js` |
| **Member B** | 3. PD Sales <br>4. Valuation Sales | `03-pd-sales.page.js`<br>`04-valuation-sales.page.js` | `stage2-sales-ops.spec.js` |
| **Member C** | 5. PD Credit <br>6. Valuation Credit <br>7. Credit Recommendation | `05-pd-credit.page.js`<br>`06-valuation-credit.page.js`<br>`07-credit-recommend.page.js` | `stage3-credit-ops.spec.js` |
| **Member D** | 8. Legal Recommendation <br>9. Technical Recommendation <br>10. BOH Verification <br>11. Sanctioned | `08-legal-recommend.page.js`<br>`09-tech-recommend.page.js`<br>`10-boh-verification.page.js`<br>`11-sanctioned.page.js` | `stage4-compliance-signoff.spec.js` |

---

## 🏁 Fresh Start Setup (Onboarding Checklist)

Follow these 3 simple steps to get the project running locally on your machine:

### Step 1: Install Dependencies
Open your VS Code terminal in the project root directory (`D:\RAJENDRAN\playwright\los_application>`) and run:
```bash
npm install
```

### Step 2: Configure Environment Profile (Optional)
*If you are running pure frontend UI tests, you can skip this step entirely. If you want to use database backend features, set up your profile below:*

1. Duplicate the reference template using your terminal:
   ```cmd
   copy .env.example .env
   ```
2. Open the newly created `.env` file in your editor.
3. Input the shared `ENCRYPTION_KEY` and `DB_ENCRYPTED_PASSWORD` provided by the Team Lead.

*⚠️ Note: Your `.env` file is automatically ignored by Git to prevent secure credentials from leaking.*

---

## 🚀 How to Execute Tests

Run the command matching your assigned workspace module:

### 🧑‍💻 Run Individual Member Assignments:
*   **Member A (Initiation):**
    ```bash
    npx playwright test tests/stages/stage1-initiation.spec.js --headed
    ```
*   **Member B (Sales Operations):**
    ```bash
    npx playwright test tests/stages/stage2-sales-ops.spec.js --headed
    ```
*   **Member C (Credit Operations):**
    ```bash
    npx playwright test tests/stages/stage3-credit-ops.spec.js --headed
    ```
*   **Member D (Compliance & Sign-off):**
    ```bash
    npx playwright test tests/stages/stage4-compliance-signoff.spec.js --headed
    ```

### 🌍 Run the Full End-to-End Workflow:
To run all stages sequentially from start to finish:
```bash
npx playwright test tests/stages/
```

---

## 🛠️ Useful Testing Flags

*   **UI Mode (Interactive Debugging):**
    Opens Playwright's visual interface to step through your script line-by-line.
    ```bash
    npx playwright test tests/stages/stage1-initiation.spec.js --ui
    ```
*   **View Test Reports:**
    Opens the interactive HTML summary highlighting screenshots and videos of failing steps.
    ```bash
    npx playwright show-report
    ```

---

## 📋 Best Practices for the Team
1. **Isolate Test Data:** Use your assigned user credentials mapped inside `data/test-data.json`.
2. **Conditional DB Execution:** Wrap any backend direct queries inside `if (process.env.DB_ENABLED === 'true') { ... }` so the test can still fall back smoothly to front-end execution for teammates who skip the DB profile.
3. **Commit Cleanly:** Work strictly inside your assigned file tracks to prevent merge conflicts.

## 🔒 Secure Environment Setup Guide (.env Process)

To secure our database credentials and protect our UAT environment, this framework uses **AES-256 local runtime encryption**. Plain-text passwords are never committed to Git. 

Database automation is **optional**. If a team member does not complete this setup, the framework will gracefully fall back to **FRONTEND-ONLY mode** and execute pure UI tests normally.

---

### 📥 Initial One-Time Configuration for Teammates

If you want to use direct database validations/bypasses during your stage tests, follow these steps to build your local profile:

#### Step 1: Duplicate the Configuration Template
Open your terminal in the project root directory (`los_application/`) and create your local `.env` file from our shared blueprint:
```bash
copy .env.example .env
```
*(Note: Your new `.env` file is hidden and securely ignored by Git).*

#### Step 2: Populate the Shared Team Secrets
Open your newly created `.env` file in VS Code and fill in the exact secret parameters distributed by the Team Lead:

```ini
DB_USER=LOS
DB_CONNECT_STRING=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=://amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))

# 🔑 PASTE THE VALUES PROVIDED BY THE TEAM LEAD HERE:
ENCRYPTION_KEY=my_secret_key_123
DB_ENCRYPTED_PASSWORD=fd2164d0ed32b6794cdf2c5e359fc5b4:7e54a4eaf2c36199726ffd3ee2308b1b
```

#### Step 3: Run and Verify Your Script
Launch your assigned test file tracking module. The framework will automatically read, validate, and decrypt your parameters securely in-memory:
```bash
npx playwright test tests/stages/stage1-initiation.spec.js --headed
```

---

### 🏗️ How It Works (Under the Hood)

```text
       ┌───────────┐         ┌───────────────────────┐
       │ .env File │ ──────> │ Playwright Engine Run │
       └───────────┘         └───────────────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
         [ NO .env File Found ]                     [ .env File Configured ]
                   │                                           │
                   ▼                                           ▼
      Logs: "FRONTEND-ONLY mode"                  Decrypts Password in Memory
                   │                                           │
                   ▼                                           ▼
       Skips Database Intercepts                    Establishes Live Oracle DB 
      Runs Pure Browser UI Flows                     Queries/Bypasses Hurdles
```

### ⚠️ Rules for the Team
1. **Never generate a new string:** Do not attempt to re-run any encryption scripts. Use the exact `DB_ENCRYPTED_PASSWORD` hex string provided above. Generating a different string with a mismatched key will result in decryption timeouts.
2. **Never change shared keys:** Changing your local `ENCRYPTION_KEY` away from the team standard will result in a hard termination error at runtime.
