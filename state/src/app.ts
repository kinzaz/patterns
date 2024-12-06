// wrong way
// type StateStatus = "draft" | "published";

// class DocumentItem {
//   public text: string;
//   private state: StateStatus;

//   constructor(text: string) {
//     this.text = text;
//     this.state = "draft";
//   }

//   getStatus() {
//     return this.state;
//   }

//   publishDoc() {
//     if (this.state === "published") {
//       console.log(`Нельзя опубликовать опубликованный текст`);
//     } else if (this.state === "draft") {
//       console.log(`На сайт отправлен текст ${this.text}`);
//       this.state = "published";
//     }
//   }

//   deleteDoc() {
//     if (this.state === "published") {
//       console.log(`Снято с публикации, переведено в черновик`);
//       this.state = "draft";
//     } else if (this.state === "draft") {
//       console.log(`Документ удален`);
//     }
//   }
// }

class DocumentItem {
  public text: string;
  private state: DocumentItemState;

  constructor() {
    this.setState(new DraftDocumentItemState(this));
  }

  getState() {
    return this.state.name;
  }

  setState(state: DocumentItemState) {
    this.state = state;
  }

  publishDoc(): void {
    this.state.publish();
  }

  deleteDoc(): void {
    this.state.delete();
  }
}

abstract class DocumentItemState {
  public name: string;
  protected document: DocumentItem;

  constructor(document: DocumentItem) {
    this.document = document;
  }

  public abstract publish(): void;
  public abstract delete(): void;
}

class DraftDocumentItemState extends DocumentItemState {
  constructor(document: DocumentItem) {
    super(document);
    this.name = "DraftDocument";
  }

  public publish(): void {
    console.log(`На сайт отправлен текст: "${this.document.text}"`);
    this.document.setState(new PublishDocumentItemState(this.document));
  }
  public delete(): void {
    console.log(`Документ удален`);
  }
}

class PublishDocumentItemState extends DocumentItemState {
  constructor(document: DocumentItem) {
    super(document);
    this.name = "PublishDocument";
  }

  public publish(): void {
    console.log(`Нельзя опубликовать уже опубликованный текст`);
  }

  public delete(): void {
    console.log(`Снято с публикации, переведено в черновик`);
    this.document.setState(new DraftDocumentItemState(this.document));
  }
}
