'use strict';

import sinon from 'sinon';

export default class FausseReponseExpress {
    constructor() {
        this.send = sinon.mock();
        this.status = sinon.mock();
        this.status.returns(this);
    }
}

