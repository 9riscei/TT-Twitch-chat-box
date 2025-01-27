-- Client-side Lua script to show the Twitch chat box, toggle visibility, and adjust transparency

RegisterCommand("toggleChat", function()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = "toggleVisibility" })
end, false)

RegisterCommand("setTransparency", function(_, args)
    local transparency = tonumber(args[1]) or 0.7
    SendNUIMessage({
        action = "setTransparency",
        transparency = transparency
    })
end, false)

-- Close the NUI when pressing Escape
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if IsControlJustPressed(0, 177) then -- ESC key
            SetNuiFocus(false, false)
        end
    end
end)
