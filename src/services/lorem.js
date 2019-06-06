import lorems from '../assets/lorems.json';

export default {
  async ipsum() {
    /*
    const text = await fetch('https://litipsum.com/api').then(res => res.text());
    const paragraphs = text.trim().split('\n\n');
    return paragraphs;
    */
    return await new Promise(res => {
      setTimeout(() => {
        res(lorems[Math.floor(Math.random() * lorems.length)].text);
      }, 200);
    });
  },
};
