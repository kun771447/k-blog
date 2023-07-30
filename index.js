class Node {}

// document
class Document extends Node {}
class DocumentFragment extends Node {}

//文本和注释
class CharacterData extends Node {}
class Comment extends CharacterData {}
class Text extends CharacterData {}

// elem
class Element extends Node {}
class HTMLElement extends Element {}
class HTMLDivElement extends HTMLElement {}
class HTMLInputElement extends HTMLElement {}
    