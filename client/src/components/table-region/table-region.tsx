import { DataI } from "../../models/data.interfaces";
import cls from "./table-region.module.scss";

interface Props {
    data: DataI[];
}
export default function TableRegion(props: Props) {
    const { data } = props;
    const maxValue: number = Math.max(
        ...data.map((item) => item.numberOfCalls)
    );
    return (
        <div className={cls["table-region"]}>
            <h2 className={cls.header}>Правонарушения по регионам</h2>
            <table>
                <tbody>
                    {data
                        .sort((a, b) => b.numberOfCalls - a.numberOfCalls)
                        .map((item, index) => (
                            <tr key={index}>
                                <td>{item.region}</td>
                                <td>
                                    <span
                                        id={cls["table-progress-bap"]}
                                        style={{
                                            width: `${(item.numberOfCalls / maxValue) * 100}%`,
                                        }}
                                    ></span>
                                    <span className={cls["table-value"]}>
                                        {item.numberOfCalls}
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
