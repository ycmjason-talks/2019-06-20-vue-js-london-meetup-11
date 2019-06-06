export default {
  async ipsum() {
    const text = await fetch('https://litipsum.com/api').then(res => res.text());
    const paragraphs = text.trim().split('\n\n');
    return paragraphs;
  },
};
