import "./loading.scss";

export default function Loading() {
    return (
        <section className="loading-container">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}
