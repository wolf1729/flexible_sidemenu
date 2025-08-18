# 📦 Flexible SideMenu

A lightweight and customizable **collapsible sidebar menu** component for **React** and **Next.js** 🚀.
Easily plug it into your project and build responsive side menus in seconds.

[![NPM version](https://img.shields.io/npm/v/flexible_sidemenu.svg?style=flat)](https://www.npmjs.com/package/flexible_sidemenu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🚀 Installation

```bash
npm install flexible_sidemenu
```

or

```bash
yarn add flexible_sidemenu
```

---

## 📖 Usage

```jsx
import React from "react";
import { SideMenu } from "flexible_sidemenu";

function App() {
  return (
    <div>
      <SideMenu />
      <h1>My App Content</h1>
    </div>
  );
}

export default App;
```

---

## 🎨 Customization

The component includes default styles via `SideMenu.css`.
You can override or extend them with your own styles:

```css
/* Example custom style */
.side-menu {
  background: #1e1e1e;
}

.menu-items li:hover {
  color: #00bcd4;
}
```

---

## 🛠️ Props

| Prop        | Type      | Default                                 | Description                      |
| ----------- | --------- | --------------------------------------- | -------------------------------- |
| `className` | string    | `""`                                    | Add custom CSS classes           |
| `items`     | string\[] | `["🏠 Home", "📄 About", "📞 Contact"]` | Menu items to render dynamically |

---

## 📂 Project Structure

```
src/
 ├─ components/
 │   ├─ SideMenu.jsx   # React component
 │   ├─ SideMenu.css   # Styles
 ├─ index.js           # Export entry
```

---

## 📝 Development

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/flexible_sidemenu.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run dev server:

   ```bash
   npm start
   ```
