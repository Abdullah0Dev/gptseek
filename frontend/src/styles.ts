import {Platform} from 'react-native';

export const styles = {
  body: {
    color: '#FFFFFF',
    fontSize: 15.7,
  },

  // Headings
  heading1: {
    flexDirection: 'row',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heading2: {
    flexDirection: 'row',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heading3: {
    flexDirection: 'row',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heading4: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heading5: {
    flexDirection: 'row',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heading6: {
    flexDirection: 'row',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Horizontal Rule
  hr: {backgroundColor: '#4F4F4F', height: 1, marginVertical: 10},

  // Emphasis
  strong: {fontWeight: 'bold', color: '#fFFF'},
  em: {fontStyle: 'italic', color: '#FFF'},
  s: {textDecorationLine: 'line-through', color: '#D3D3D3'},

  // Blockquotes
  blockquote: {
    backgroundColor: '#2E2E2E',
    borderLeftColor: '#FFF',
    borderLeftWidth: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },

  // Lists
  bullet_list: {},
  ordered_list: {},
  list_item: {flexDirection: 'row', alignItems: 'center', color: '#FFFFFF'},
  bullet_list_icon: {marginRight: 8, color: '#FFF'},
  ordered_list_icon: {marginRight: 8, color: '#FFF'},
  bullet_list_content: {flex: 1, color: '#FFFFFF'},
  ordered_list_content: {flex: 1, color: '#FFFFFF'},

  // CodeBlocks
  code_inline: {
    backgroundColor: '#1E1E1E',
    color: '#50FA7B',
    padding: 5,
    borderRadius: 5,
    fontFamily: 'Roboto',
  },
  code_block: {
    backgroundColor: '#1E1E1E',
    color: '#F8F8F2',
    padding: 10,
    borderRadius: 5,
    fontFamily: 'Roboto',
  },
  fence: {
    backgroundColor: '#1E1E1E',
    color: '#F8F8F2',
    padding: 10,
    borderRadius: 5,
    fontFamily: 'Roboto',
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: '#4F4F4F',
    borderRadius: 5,
    color: '#FFFFFF',
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#44475A',
    color: '#FFFFFF',
  },
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#4F4F4F',
  },
  td: {flex: 1, padding: 5, color: '#FFFFFF'},

  // Links
  link: {color: '#8BE9FD', textDecorationLine: 'underline'},
  blocklink: {flex: 1, borderBottomWidth: 1, borderBottomColor: '#8BE9FD'},

  // Images
  image: {flex: 1},

  // TextOutput
  text: {
    fontFamily: 'Roboto',
  },
  textgroup: {},
  paragraph: {
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    color: '#FFFFFF',
  },
  hardbreak: {width: '100%', height: 1},
  softbreak: {},
  pre: {},
  inline: {},
  span: {},
};
