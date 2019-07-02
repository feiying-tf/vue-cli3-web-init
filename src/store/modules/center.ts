interface User {
  [prop: string]: string;
}

interface State {
  user: User | null
}


let state:State = {
  user: null
};

const user = {
  state,
  mutations: {
    SET_USER: (state: State, user:User) => {
      state.user = user
    },
  }
}

export default user