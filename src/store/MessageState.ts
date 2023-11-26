import MyStateCreator from "./useCombineStates";

export interface IMessage {
  id: number;
  text: string;
  priority: boolean;
  statusRead: boolean;
}

export interface IMessageState {
  messages: IMessage[];
  badges: number;
  setMessages: (value: IMessage) => void;
  removeMessage: (value: number) => void;
  removeAllMessages: () => void;
  changeMessageStatus: (value: number) => void;
}

export const createMessageState: MyStateCreator<IMessageState> = (set) => ({
  messages: [],
  badges: 0,

  setMessages: (value) =>
    set(
      (state) => {
        return { messages: [value, ...state.messages], badges: ++state.badges };
      },
      false,
      "setMessages"
    ),
  removeMessage: (value) =>
    set(
      (state) => {
        const _messages = [...state.messages];
        const _filteredMessages = _messages.filter((e) => e.id !== value);
        return { messages: _filteredMessages };
      },
      false,
      "removeMessage"
    ),
  removeAllMessages: () => set(() => ({ messages: [], badges: 0 }), false, "removeAllMessage"),
  changeMessageStatus: (value) =>
    set(
      (state) => {
        const _messages = [...state.messages];
        const _currentMessage = _messages.find((e) => e.id === value);
        if (_currentMessage?.statusRead) return state;
        const _result = _messages.map((e) => (e.id === value ? { ...e, statusRead: true, priority: false } : e));
        return { messages: _result, badges: --state.badges };
      },
      false,
      "changeStatus"
    ),
});
