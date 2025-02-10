# GenAI Study Task Starter Template

## Manual Setup

### 1. Start Github Codespace

Directly via this link ([Start Codespace](https://github.com/codespaces/new?template_repository=Taremeh/genai-study-task-starter-template)) or by clicking on `Code` and `Create codespace on main` at the top of the repository page.

### 2. Installing Dependencies

**Wait** until the automatically triggered installation is completed. It can take several minutes. In case of a failure you can manually install all necessary dependencies with `yarn install`.

### 3. Running the Application Development Environment

#### 3.1 Load Demo Data into Database

```bash
npx ts-node apps/api/src/db/init.ts
```

#### 3.2 Run the following command to start the development environment.

```bash
$ yarn run dev
```

#### 3.3 Open the live preview of the application in a new tab. 

A pop-up will show up as soon as the application is running. Click on `Open in browser` to open the live preview in a new tab. 
Alternatively, you can open the live preview any time via the link provided in the VS Code tab `PORTS` which is usually located at the bottom of VS Code. The link looks something like this: "[https://didactic-pancake-69695gvr96crgpp-3000.app.github.dev](#)".

## 📜 License

This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.
