# 🍞 Toastrr - Lightweight and Customizable Toast Notifications

Toastrr is a cool looking, lightweight and customizable toast notification library for JavaScript applications. It provides an easy way to display non-intrusive messages to users, improving the user experience.

## 🚀 Features

- 🔥 Easy to integrate
- 🎭 Supports multiple toast types (success, error, warning, info. promises)
- ⏳ Auto-dismiss with configurable timeout
- 📌 Supports sticky (non-dismissible) notifications
- 🏗 Lightweight and dependency-free
- 😜 Written in Typescript

## 📦 Installation

You can install Toastify using npm or yarn:

```sh
npm install toastrr
```

or

```sh
yarn add toastrr
```

## 🛠 Usage

Import Toaster Component and add it in your App.js file:

```js
import Toaster from 'toastrr';

function App () {
  return (
    <div>
        <Toaster/>
        <Button/>
    </div>
  )
}
```

Now you can import the Toast object and use it anywhere in the application to pop up a cool toast

```js
import toast from 'toastrr';

function Button() {
  return(
    <div>
        <button onClick = { () => toast.success('Hello, World!') }>
            Raise a toast
        </button>
    </div>
  )
}

## 🎨 Customization

You can customize your toast by passing various options:

```js
Toaster({
  duration: 5000,
  closeButton: true,
  position: "top-left",
  theme: "dark",
})
```

## 📌 Toast Available Options

| Option          | Type               | Default       | Description |
|-----------------|--------------------|---------      |-------------|
| `message`       | `string`           | `''`          | Toast message |
| `duration`      | `number or string` | `3000`        | Time in milliseconds before auto-dismiss for persistent toast use `infinite` |
| `closeButton`   | `boolean`          | `true`        | Show close button |
| `position`      | `string`           | `'top-right'` | Toast Alignment (`top-left`, `bottom-left`, `top-center`, `bottom-center`,  `bottom-right`, or `top-right`) |
| `theme`         | `string`           | `'light'`     | Theme of the toast ( `light`, `dark` ) |

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ by Atul Goyal

