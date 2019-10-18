# MongoDB Multi-Document Transactions in Node

This code demonstrates performing a multi-document transaction using MongoDB in JavaScript.

## One.js

Demonstrates a successful transaction (unless... maybe not always).

Note that a transaction is a concept tied together by a session. The operations performed under the transaction's scope are NOT shipped to the server at once. Rather, a session correlates those and the client needs to  commit or abort the transaction. The driver simplifies this and adds retries on some writes. It also wraps the `commit()` if no exception occurs, and an `abort()` if an exception is caught.

## Two.js

Demonstrates an aborted transaction. To trigger the aborted transaction, insert a document containing `{name: 'ogg'}` into the `peeps` collection.

## Three.js

Demonstrates that transactions are a private thing. Another session or observer does not see the writes outside of the transaction / session scope.

Once the program pauses, execute `db.peeps.find()` and observe that the document with `{name: 'bob'}` is NOT returned. This is because the transaction is not yet committed.

