---
marp: true
theme: uncover
html: true
---

# Project scamdom

Welkom.

---

# Framework

Backend: Laravel
Frontend: React

---

# Technologieen

Websockets, Inertia, SPA

---

# Wat hebben we geleerd

-   Elke online casino is rigged
-   Live data syncen tussen server en client
-   Eerste project met React

---

# Voorbeeld code

```js
const [balance, setBalance] = useState(user.balance);

useEffect(() => {
    window.Echo.private(`wallet-balance.${user.id}`).listen(
        "WalletBalanceUpdated",
        (e) => {
            let balance = e.balance;
            setBalance(balance);
        }
    );
}, []);
```

---

# Honorable mention

![kaas](https://preview.redd.it/jszezc86hpkb1.jpg?width=1080&crop=smart&auto=webp&s=f86fd0e24e2a229072d71ddd2eeaa611f623f324)

<style>
  :root {
    --color-background: #0a1119;
    --color-background-code: #131a22;
    --color-background-paginate: rgba(128, 128, 128, 0.05);
    --color-foreground: #fff;
    --color-highlight: #0a1119;
    --color-highlight-hover: #0a1119;
    --color-highlight-heading: #0a1119;
    --color-header: #0a1119;
  }

  h1 {
    color: #30c149;
  }
  img {
  max-width: 80%;
  max-height: 500px;
  margin: 0 auto;
}
</style>
