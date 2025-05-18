```ts
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

// ...

polyfillCountryFlagEmojis();
```

### 2. Update your CSS

This will load a webfont called `"Twemoji Country Flags"` on relevant browsers. Next, prefix your `font-family` CSS with this font **everywhere where you want country flags to work**. Eg if your CSS currently has this:

```
body {
  font-family: "Helvetica", "Comic Sans", serif;
}
```

then you want to change it to

```
body {
  font-family: "Twemoji Country Flags", "Helvetica", "Comic Sans", serif;
}
```

This is safe because the font is loaded such that the browser will only use it for country flag emojis and not for any other characters (using [`unicode-range`](https://github.com/talkjs/country-flag-emoji-polyfill/blob/master/src/index.ts#L45)). Therefore, the browser will simply use the next font in the list for every character except country flags.

Browsers that have native support for country flags will not load the font at all, and therefore will simply ignore it in the `font-family` list.

## API

```ts
function polyfillCountryFlags(fontName?: string, fontUrl?: string): boolean;
```

Injects a web font with country flags if deemed necessary.

Parameters:

- `fontName` - (optional) Override the default font name ("Twemoji Country Flags")
- `fontUrl` - (optional) Override the font URL (defaults to a jsdeliver-hosted)

If the browser supports color emojis but not country flags, this function injects a `style` element into the HEAD with a web font with country flags, and returns `true`. Otherwise, it does nothing and returns `false`.

## Background

Firefox on Windows adds country flag emoji support falling back on their [Twemoji Mozilla](https://github.com/mozilla/twemoji-colr) font, which itself is simply all [Twemoji](https://twemoji.twitter.com/) emojis concatenated into a single huge color font.

Chromium, however, apparently [does not plan to support country flags on Windows](https://bugs.chromium.org/p/chromium/issues/detail?id=1209677#c5), except if Windows itself adds it. This means that Chromium-based browsers such as Chrome, Edge and Brave won't likely support it soon either. That's a huge chunk of browser users, who will complain that other people's nice flag emojis look to them like "ᴄʜ" and not like a picture.

Until either Microsoft or Google recognize how ridiculous this is, you're stuck with this polyfill.

### How it works

This polyfill merely combines other people's hard work.

The key building block of this polyfill is a font, "Twemoji Country Flags", a subset of "Twemoji Mozilla" made using the excellent [`pyftsubset`](https://fonttools.readthedocs.io/en/latest/subset/index.html) tool from [fonttools](https://github.com/fonttools/fonttools).

This is important, because Twemoji Mozilla is 1.5MB, which is a pretty huge hit on your app perfomance. The subset is only 78kb, which is much better.

It then injects some CSS to load this font as a webfont, but only if the browser supports regular emojis and not country flags.

As far as I can tell, all browsers that have this problem support WOFF2 fonts, so I made no effort to do the usual multi-font-format `@font-face` syntax (with eg ttf and woff fonts also).

### How to build

This might need updates if [Twemoji Mozilla](https://github.com/mozilla/twemoji-colr) gets a new version - especially if new country flags are added.

- clone the repo
- make sure you're on a system with bash, fonttools and curl (On my WSL/Ubuntu, a single `apt install fonttools` was enough)
- run `npm run make-font`
- find the new font in `dist/TwemojiCountryFlags.woff2`
