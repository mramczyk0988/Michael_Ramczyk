
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 5;



        var renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor("#e5e5e5");
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth/ window.innerHeight;

            camera.updateProjectionMatrix();

        })

       var raycaster = new THREE.Raycaster();
       var mouse = new THREE.Vector2();


        var geometry = new THREE.BoxGeometry(1,1, 1);
        var material = new THREE.MeshLambertMaterial({color: 0XFFCC00});
        // var mesh = new THREE.Mesh(geometry, material);
        // var mesh1 = new THREE.Mesh(geometry, material);
        // var mesh2 = new THREE.Mesh(geometry, material);
        // var mesh3 = new THREE.Mesh(geometry, material);

        
        // mesh.position.set(2,3,-2);
        // mesh.rotation.set(35,0,0);
        // mesh.scale.set(1,1,1)
        // mesh2.position.set(-3,1,-3);
        // mesh3.position.set(-2,-3,-6);
        // mesh1.position.x = 4;
        

        // scene.add(mesh);
        // scene.add(mesh1);
        // scene.add(mesh2);
        // scene.add(mesh3);

        meshX = -10;
        for(var i = 0; i<15;i++){
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = (Math.random() - 0.5) * 10;
          mesh.position.y = (Math.random() - 0.5) * 10;
          mesh.position.z = (Math.random() - 0.5) * 10;
          scene.add(mesh);
          meshX+=1;
        }

        // meshX = -10;
        // for(var i = 0; i<15;i++) {
        //     var mesh = new THREE.Mesh(geometry, material);
        //     mesh.position.x = (Math.random() - 0.5) * 10;
        //     mesh.position.y = (Math.random() - 0.5) * 10;
        //     mesh.position.z = (Math.random() - 0.5) * 10;
        //     scene.add(mesh);
        //     meshX+=1;
        // }


        
        const spaceTexture = new THREE.TextureLoader().load('space.jpg');
        scene.background = spaceTexture;

        var light = new THREE.PointLight(0xFFFFFF, 1, 1100)
        light.position.set(0,0,0);
        scene.add(light);

        var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
        light.position.set(0, 0, 25);
        scene.add(light);
        
      var render = function() { 
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.001;
         
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }

      function onMouseMove(event) {
          // event.preventDefault();

          mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
          mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);

          var intersects = raycaster.intersectObjects(scene.children, true);
          for (var i = 0; i < intersects.length; i++) {
            this.tl = new TimelineMax();
            this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
            this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
            this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut})
            this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")
            this.tl.to(intersects[i].object.position, -.5, {x: 2, ease: Expo.easeOut})
         }
      }

      render();
   

      window.addEventListener('mousemove', onMouseMove );