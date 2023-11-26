import MyStateCreator from "./useCombineStates";

interface IText {
  id: number;
  text: string;
  status: boolean;
}

export interface IMessage {
  messages: IText[];
  badges: number;
  setMessages: (value: IText) => void;
  removeMessage: (value: number) => void;
  removeAllMessages: () => void;
  changeMessageStatus: (value: number) => void;
}

export const createMessageState: MyStateCreator<IMessage> = (set) => ({
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
        if (_currentMessage?.status) return state;
        const _result = _messages.map((e) => (e.id === value ? { ...e, status: true } : e));
        return { messages: _result, badges: --state.badges };
      },
      false,
      "changeStatus"
    ),
});
