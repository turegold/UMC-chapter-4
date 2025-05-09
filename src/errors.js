export class DuplicateStoreIdError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NonExistentStoreError extends Error {
    errorCode = "U002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NonExistentUserError extends Error {
    errorCode = "U003";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class ExistentUserMissionError extends Error {
    errorCode = "U004";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class InvalidUserMissionError extends Error {
    errorCode = "U005";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
