import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createDevice, deleteDevice, getDevice, updateDevice,getDeviceTypes,getDeviceCapabilities} from "../api/devices.api";
import { toast } from "react-hot-toast";

export function DevicesFormPage() {
  const [isShown, setIsShown] = useState(false);
  const [device_types, setDeviceTypes] = useState([]);
  const [device_capab, setDeviceCapab] = useState([]);

  useEffect(() => {
    async function loadDeviceTypes() {
      const res = await getDeviceTypes();
      setDeviceTypes(res.data["types"]);
    }
    loadDeviceTypes();
  }, []);


  useEffect(() => {
    async function loadDeviceCapab() {
      const res = await getDeviceCapabilities();
      setDeviceCapab(res.data["capabilities"]);
    }
    loadDeviceCapab();
  }, []);


  const handleClick = event => {
    setIsShown(current => !current);

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateDevice(params.id, data);
      toast.success("Device updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createDevice(data);
      toast.success("New Device Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate("/devices");
  });

  useEffect(() => {
    async function loadDevice() {
      if (params.id) {
        const { data } = await getDevice(params.id);
        setValue("model", data.model);
        setValue("type", data.type);
        setValue("category", data.category);

      }
    }
    loadDevice();
  }, []);


  
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        <input
          type="text"
          placeholder="Model"
          {...register("model", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />

        {errors.model && <span>This field is required</span>}

        <select
          type="text"
          placeholder="Type"
          {...register("type", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        >
          {device_types.map((type, index) => (<option key={index} value={type}>{type}</option>))}
        </select>

        {errors.type && <span>This field is required</span>}

        <select
          type="text"
          placeholder="Category"
          {...register("category", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        >
          {device_capab.map((capability, index) => (<option key={index} value={capability}>{capability}</option>))}
        </select>

        {errors.category && <span>This field is required</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3" onClick={handleClick}>
          Save
        </button>
      </form>
      {isShown && <button disabled type="button" class="text-white bg-zinc-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
</button>}

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("Are you sure?");
              if (accepted) {
                await deleteDevice(params.id);
                toast.success("Device Removed", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/devices");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}