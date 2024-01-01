import app from './app'
import { PORT } from './configs/environment/environment.config'

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})