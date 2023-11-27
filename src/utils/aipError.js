class apierror extends error{
    constructor(
        errors = [],
        message='Something went wrong',
        stack = '',
        statusCode
    ){
        super(message)
        this.errors = errors
        this.message = message
        this.success = false
        this.data = null
        this.statusCode = statusCode

    }    
}

export { apierror }