# Mini App'ni joylashtirish (bepul)

Mini App = `index.html` + `content.json`. Ikkalasini bitta HTTPS manzilга qo'yish kerak.
`content.json` bot ishga tushganda avtomatik yangilanadi (yagona manba — `content.py`).

## Eng oson yo'l: GitHub Pages (bepul, HTTPS)

1. github.com da hisob oching → yangi **repository** (public), masalan `ssa-miniapp`.
2. `miniapp` papkasidagi **index.html** va **content.json** ni repositoryга yuklang (Upload files).
3. Repository → **Settings → Pages** → Source: `main` branch, `/root` → Save.
4. 1-2 daqiqadan so'ng manzil chiqadi: `https://<username>.github.io/ssa-miniapp/`

## Botга ulash (@BotFather)

1. Telegramда **@BotFather** → `/mybots` → botingiz (@ssa_uzbot) → **Bot Settings → Menu Button → Configure menu button**.
2. Mini App manzilini yozing: `https://<username>.github.io/ssa-miniapp/`
3. Tugma nomi: `📱 Ilova` (yoki xohlagan nom).

Endi botда pastda **📱 Ilova** tugmasi chiqadi — bosilса Mini App ochiladi.

## Yangilash

Narx yoki matn o'zgarsa:
1. `content.py` (yoki `subjects.py`) ni tahrirlang → botни qayta ishga tushiring
   (bot `content.json` ni avtomatik yangilaydi).
2. Yangi `miniapp/content.json` ni GitHub'ga qayta yuklang.

> Keyinchalik buni ham avtomatlashtirish mumkin (bot content.json ni to'g'ridan-to'g'ri
> hostingга yuborsin). Hozircha qo'lda yuklash yetarli.

## Sinash (kompyuterда)

`miniapp` papkasida:
```
python -m http.server 8000
```
keyin brauzerда `http://localhost:8000` — dizaynni ko'rasiz (Telegram funksiyalari faqat
Telegram ичida ishlaydi).
