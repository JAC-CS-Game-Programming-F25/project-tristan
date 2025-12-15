export default class PointsManager {
    static loadPoints() {
        const points = JSON.parse(localStorage.getItem('points')) ?? 0;

        return points;
    }

    static savePoints(points) {
        localStorage.setItem('points', JSON.stringify(points));
    }
}