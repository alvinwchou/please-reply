// FormError.js

function FormError({ errorMessage }) {
    return (
        <div className="formError">
            <p>{errorMessage}</p>
        </div>
    )
}

export default FormError