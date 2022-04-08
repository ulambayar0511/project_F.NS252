import Particles from "react-tsparticles";

const ParticleBackground = () => {
  return (
    <div>
      <Particles
        options={{
          backgroundMode: {
            enable: true,
            zIndex: -10,
          },
          fpsLimit: 120,
          interactivity: {
            detect_on: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 8,
                size: 40,
              },
              push: {
                particles_nb: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "out",
              random: false,
              speed: 6,
              straight: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.3,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: "../../public/assets/images/logo.svg",
                width: 100,
                height: 100,
              },
            },
            size: {
              random: true,
              value: 3,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
