

let app = new Vue({
    el: '#app',
    data: {

        page: 'panels',
        list: [],
        camera: {},

        menuvisible: false,
        movementvisible: false,

        unlockvehicles: false,
        unlockplayers: false,

        Title:'Los Santos CCTV',
        CCTV:'CCTV',
        PoliceCCTV:'Services Publiques',
        CompaniesCCTV:'Entreprises',
        LOCKED:'( Verrouillé )',
        Return:'Retour',

        CamTextST:'👁',

        CCTVlist:       [],
        Policelist:     [],
        Companieslist:   [],



    },
    watch: {},
    methods: {
        ON(ispolice) {
            alt.emit('BIP', "Turn");
            app.page = 'panels';
            app.menuvisible = true;
            app.movementvisible = false;
            app.unlockpolice = ispolice;
        },
        OFF() {
            if(app.page == 'panels') {

                alt.emit('BIP', "Turn");
                app.menuvisible = false;
                app.movementvisible = false;
                app.unlockpolice = false;
                alt.emit('KillCam');
                alt.emit('Close')

            } else if (app.page == 'list') { app.BacktoMenu() }
        },

        ListCCTV(){
            alt.emit('BIP', "Click");
            app.page = 'list';
            app.list = app.CCTVlist;
        },
        ListCompaniesCCTV(){
            alt.emit('BIP', "Click");
            app.page = 'list';
            app.list = app.Companieslist;
        },
        ListPoliceCCTV(){
            alt.emit('BIP', "Click");
            app.page = 'list';
            app.list = app.Policelist;
        },

        BacktoMenu(){
            alt.emit('BIP', "Click");
            app.page = 'panels';
            app.list = [];
        },

        BacktoList(){
            alt.emit('BIP', "Turn");
            alt.emit('KillCam');
            app.page = 'list';
            app.menuvisible = true;
            app.movementvisible = false;
        },

        Camera(cam){
            alt.emit('BIP', "Turn");
            alt.emit('CameraFixe', cam);
            app.camera = cam;
            app.menuvisible = false;
            app.movementvisible = true;
        },

        SeeThrough(){
            alt.emit('BIP', "Turn");
            alt.emit('SeeThrough');
        },

    }
});

