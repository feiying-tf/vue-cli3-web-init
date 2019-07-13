interface Type {
  id: string;
  code: string;
}

interface State  {
  newsType: Array<Type>
}

let state:State = {
  newsType: []
}

const news = {
  state,
  mutations: {
    SET_NEWSTYPE: (state: State, newsType: Array<Type>) => {
      state.newsType = newsType
    },
  }
}

export default news
