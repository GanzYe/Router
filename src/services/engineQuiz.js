export default class EngineQuiz{

    _apiBase = 'https://engine.lifeis.porn/api/millionaire.php';
  
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return await res.json();
    }
  
    async getEasyQuastion() {
      const res = await this.getResource(`?qType=1&count=5`);
      return res.data.map(this._transformQuasiton);
    }
  
    async getNormQuastion(id) {
      const res = await this.getResource(`?qType=2&count=5`);
      return res.data.map(this._transformQuasiton);
    }

    async getBossQuastion(id) {
      const res = await this.getResource(`?qType=3&count=5`);
      return res.data.map(this._transformQuasiton);
    }
  
    _transformQuasiton=(data)=> {
      return {
        name: data.question,
        answers: data.answers
      }
    }
  }
  