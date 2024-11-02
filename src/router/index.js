import VueRouter from 'vue-router'
import MyHomePage from '../components/HomePage.vue'
import MyDeployView from '../components/deplory/DeployView.vue'
import MyProvQuery from '../components/prov/ProvQuery.vue'
import MyKnnRetrieval from '../components/knn/KnnRetrieval.vue'

const router = new VueRouter({

    routes: [
        {
            path: '/',
            component: MyHomePage,
            children: [
                {
                    path: 'nodeDeploy',
                    components: {
                        nodeDeploy: MyDeployView,
                    }
                },
                {
                    path: 'provQuery',
                    components: {
                        provQuery: MyProvQuery,
                    }
                },
                {
                    path: 'knnRetrieval',
                    components: {
                        knnRetrieval: MyKnnRetrieval
                    }
                }
            ]
        },

    ]
})

export default router